import InputView from '../utils/inputView';
import CarsListView from '../views/garage/carsList/carsListView';
import {
  createCar,
  deleteCar,
  getCar,
  getCars,
  updateCar,
} from '../API/garage';
import { deleteWinner, getWinner } from '../API/winners';
import { getRandomCarName } from '../utils/carNames';
import Pagination from '../utils/pagination';

const GENERATE_COUNT: number = 100;
const LIMIT_PAGES: number = 7;

export async function fetchCarsByApi(
  currPage: number,
  limit: number,
): Promise<{
  cars: { name: string; color: string; id: number }[];
  totalCount: number;
}> {
  try {
    return await getCars(currPage, limit);
  } catch (error) {
    console.error('Error', error);
    return { cars: [], totalCount: 0 };
  }
}

export async function fetchCarByApi(id: number): Promise<void> {
  try {
    await getCar(id);
  } catch (error) {
    console.error('Error', error);
  }
}

export async function createCarByApi(
  carsList: CarsListView,
  nameInput: InputView,
  colorInput: InputView,
  pagination: Pagination<void>,
) {
  const name = nameInput.getValue();
  const color = colorInput.getValue();
  const car = { name, color };
  try {
    const newCar = await createCar({ name, color });

    await carsList.getCarsAndCounter(getCurrPage(pagination), LIMIT_PAGES);
  } catch (error) {
    console.error('Error');
  }
}

export async function updateCarByApi(
  carsList: CarsListView,
  nameInput: InputView,
  colorInput: InputView,
  pagination: Pagination<void>,
): Promise<void> {
  const name = nameInput.getValue();
  const color = colorInput.getValue();

  try {
    const selCar = carsList.selectedCar;
    if (selCar) await updateCar(selCar.carId, { name, color });

    await carsList.getCarsAndCounter(getCurrPage(pagination), LIMIT_PAGES);
  } catch (error) {
    console.error('Error');
  }
}

export async function deleteCarByApi(
  carsList: CarsListView,
  id: number,
  pagination: Pagination<void>,
): Promise<void> {
  try {
    await deleteCar(id);
    await deleteWinnerIfExists(id);
    await carsList.getCarsAndCounter(getCurrPage(pagination), LIMIT_PAGES);
  } catch (error) {
    console.error('Error');
  }
}

export async function deleteWinnerIfExists(id: number): Promise<void> {
  try {
    const winner = await getWinner(id);
    if (winner) {
      await deleteWinner(id);
    }
  } catch (error) {
    console.error('Error', error);
  }
}

export async function generateCars(
  carsList: CarsListView,
  pagination: Pagination<void>,
) {
  try {
    const cars = Array.from({ length: GENERATE_COUNT }, () => ({
      name: getRandomCarName(),
      color: getRandomColor(),
    }));

    await Promise.all(cars.map((car) => createCar(car)));
    await carsList.getCarsAndCounter(getCurrPage(pagination), LIMIT_PAGES);
  } catch (error) {
    console.error('Error');
  }
}

export function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export function getCurrPage(pagination: Pagination<void>): number {
  if (pagination) {
    return pagination.currentPageNumber;
  }
  return 1;
}
