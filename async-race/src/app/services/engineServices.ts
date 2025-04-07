import CarView from '../views/garage/carsList/car/carView';
import { startOrStopEngine, switchDriveMode } from '../API/engine';
import Pagination from '../utils/pagination';
import { getCars } from '../API/garage';
import CarsListView from '../views/garage/carsList/carsListView';
import RaceState from '../states/raceState';
import { handleWinner, showWinner } from './winnerServices';
import { Car } from '../../types/types';

let activeAnimation: number | null = null;
let cancelAnimation = false;
let isWinner = false;
const TRACK_WIDTH_PERCENT = 81;

export async function getVelocityAndDistanceByApi(id: number,): Promise<{ velocity: number; distance: number } | undefined> {
  try {
    const response = await startOrStopEngine(id, 'started');
    return { velocity: response.velocity, distance: response.distance };
  } catch (error) {
    console.error('Error getting velocity and distance', error);
    throw error;
  }
}

export async function stopCar(id: number): Promise<void> {
  try {
    await startOrStopEngine(id, 'stopped');
  } catch (error) {
    console.error('Car stop error', error);
  }
}

export async function startCar(car: CarView, isRacing?: boolean): Promise<void> {
  try {
    const carDrivingData = await getVelocityAndDistanceByApi(car.carId);
    if (carDrivingData) {
      await startDriving(car, carDrivingData, isRacing);
    }
  }
  catch (error) {
    console.error('Car start error', error);
  }
}

export async function startDriving(car: CarView, carDrivingData: | { velocity: number; distance: number; } | undefined, isRacing?: boolean): Promise<void> {
  if (car.carSvgElement && carDrivingData) {
    const carElement = car.carSvgElement.getView();
    const timeDuration = carDrivingData.distance / carDrivingData.velocity;
    const screenWidth = window.innerWidth;
    const maxDistance = (TRACK_WIDTH_PERCENT * screenWidth) / 100;
    const start = performance.now();

    cancelAnimation = false;
    let isCarBroken = false;

    requestAnimationFrame(function animate(time: number) {
      if (isCarBroken || cancelAnimation) return;

      let timeFraction = (time - start) / timeDuration;
      if (timeFraction > 1) timeFraction = 1;

      draw(timeFraction);

      function draw(progress: number) {
        carElement.style.transform = `translateX(${progress * maxDistance}px)`;

        if (progress >= 1 && !isWinner && isRacing) {
          isWinner = true;
          showWinner(car);
          handleWinner(car.carId, getCorrectTime(timeDuration));
        }
      }

      if (timeFraction < 1) {
        activeAnimation = requestAnimationFrame(animate);
      }
    });

    try {
      await switchDriveMode(car.carId, 'drive');
    } catch (error) {
      isCarBroken = true;
      console.error(`${car.carName} has been stopped suddenly, engine was broken down.`, error);
    }
  }
}

export async function restartCar(car: CarView): Promise<void> {
  try {
    cancelAnimation = true;
    if (activeAnimation !== null) {
      cancelAnimationFrame(activeAnimation);
    }
    await stopCar(car.carId);
    if (car.carSvgElement) {
      const carElement = car.carSvgElement.getView();
      carElement.style.transform = `translateX(0px)`;
    }
  } catch (error) {
    console.error('Restart error', error);
  }
}

export async function getAllCarsInPage(page: number, limit: number = 7) {
  try {
    const { cars } = await getCars(page, limit);
    return cars;
  } catch (error) {
    console.error('Getting cars error', error);
  }
}

export async function startRace(pagination: Pagination<Car>, carElements: CarsListView): Promise<void> {
  try {
    const raceState = RaceState.getInstance();
    raceState.startRace();

    const cars = await getAllCarsInPage(pagination.currentPageNumber);
    if (cars) {
      const isRacing = true;
      const carsToStart = cars.map(
        (car: Car) =>
          carElements.cars.find((view) => view.carId === car.id),
      );

      await Promise.all(
        carsToStart.filter((carView): carView is CarView => carView !== undefined).map((carView: CarView) => startCar(carView, isRacing)),
      );
    }
  } catch (error) {
    console.error('Start race error', error);
  }
}

export async function resetRace(carsListView: CarsListView): Promise<void> {
  try {
    const raceState = RaceState.getInstance();
    raceState.refreshRace();

    isWinner = false;
    const carsToReset = carsListView.cars.filter(
      (carView) =>
        carView.carSvgElement?.getView().style.transform !== 'translateX(0px)',
    );

    await Promise.all(carsToReset.map((carView) => restartCar(carView)));
  } catch (error) {
    console.error('Reset race error', error);
  }
}


function getCorrectTime(time: number): number {
  return Math.min(parseFloat((time / 1000).toFixed(2)));
}
