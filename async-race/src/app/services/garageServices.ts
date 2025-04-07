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
import type { Car } from '../../types/types';

const GENERATE_COUNT: number = 100;

export async function fetchCarsByApi(currPage: number, limit: number,): Promise<{ cars: Car[]; totalCount: number; }> {
  try {
    return await getCars(currPage, limit);
  } catch (error) {
    console.error('Error fetching cars', error);
    return { cars: [], totalCount: 0 };
  }
}

export async function fetchCarByApi(id: number): Promise<void> {
  try {
    await getCar(id);
  } catch (error) {
    console.error('Error fetching car', error);
  }
}

export async function createCarByApi(nameInput: InputView, colorInput: InputView, pagination: Pagination<Car>) {
  const name = nameInput.getValue();
  const color = colorInput.getValue();
  try {
    await createCar({ name, color });

    await pagination.loadPage();
  } catch (error) {
    console.error('Error creating car', error);
  }
}

export async function updateCarByApi(carsList: CarsListView, nameInput: InputView, colorInput: InputView, pagination: Pagination<Car>): Promise<void> {
  const name = nameInput.getValue();
  const color = colorInput.getValue();

  try {
    const selCar = carsList.selectedCar;
    if (selCar) await updateCar(selCar.carId, { name, color });

    await pagination.loadPage();
  } catch (error) {
    console.error('Error updating car', error);
  }
}

export async function deleteCarByApi(id: number, pagination: Pagination<Car>): Promise<void> {
  try {
    await deleteCar(id);
    await deleteWinnerIfExists(id);
    await pagination.loadPage();
  } catch (error) {
    console.error('Error deleting car', error);
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

export async function generateCars(pagination: Pagination<Car>): Promise<void> {
  try {
    const cars = Array.from({ length: GENERATE_COUNT }, () => ({
      name: getRandomCarName(),
      color: getRandomColor(),
    }));

    await Promise.all(cars.map((car) => createCar(car)));
    await pagination.loadPage();
  } catch (error) {
    console.error('Error generating cars', error);
  }
}

export function getRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
