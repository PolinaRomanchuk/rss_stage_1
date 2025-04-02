import CarView from '../views/garage/carsList/car/carView';
import { startOrStopEngine, switchDriveMode } from '../API/engine';
import Pagination from '../utils/pagination';
import { getCars } from '../API/garage';
import CarsListView from '../views/garage/carsList/carsListView';
import WinnerView from '../views/garage/winnerView';
import { createWinner, getWinner, updateWinner } from '../API/winners';

let activeAnimation: number | null = null;
let cancelAnimation = false;
let iswinner = false;

export async function loadData(
  id: number,
): Promise<{ velocity: number; distance: number } | undefined> {
  try {
    const { velocity, distance } = await startOrStopEngine(id, 'started');
    console.log(velocity);
    return { velocity, distance };
  } catch (error) {
    console.error('Error');
    return undefined;
  }
}

export async function stopCar(id: number): Promise<void> {
  try {
    await startOrStopEngine(id, 'stopped');
  } catch (error) {
    console.error('Error');
  }
}

export async function startCar(car: CarView) {
  const data = await loadData(car.id);
  await startDriving(car, data);
}

export async function startDriving(
  car: CarView,
  data:
    | {
        velocity: number;
        distance: number;
      }
    | undefined,
) {
  if (car.carSvgElement && data) {
    const carElement = car.carSvgElement.getView();
    const timeDuration = data.distance / data.velocity;
    const screenWidth = window.innerWidth;
    const maxDistance = (81 * screenWidth) / 100;
    let start = performance.now();

    cancelAnimation = false;
    let isCarBroken = false;

    requestAnimationFrame(function animate(time: number) {
      if (isCarBroken || cancelAnimation) return;

      let timeFraction = (time - start) / timeDuration;
      if (timeFraction > 1) timeFraction = 1;

      draw(timeFraction);

      function draw(progress: number) {
        carElement.style.transform = `translateX(${progress * maxDistance}px)`;

        if (progress >= 1 && !iswinner) {
          iswinner = true;
          showWinner(car);
          saveWinner(car, timeDuration);
        }
      }

      if (timeFraction < 1) {
        activeAnimation = requestAnimationFrame(animate);
      }
    });

    try {
      await switchDriveMode(car.id, 'drive');
    } catch (error) {
      isCarBroken = true;
    }
  }
}

export async function restartCar(car: CarView) {
  cancelAnimation = true;
  if (activeAnimation !== null) {
    cancelAnimationFrame(activeAnimation);
  }
  await stopCar(car.id);
  if (car.carSvgElement) {
    const carElement = car.carSvgElement.getView();
    carElement.style.transform = `translateX(0px)`;
  }
}

export async function getAllCarsInPage(page: number, limit: number = 7) {
  try {
    const { cars } = await getCars(page, limit);
    return cars;
  } catch (error) {
    console.error('Error');
  }
}

export async function startRace(
  pagination: Pagination<void>,
  carsListView: CarsListView,
) {
  const cars = await getAllCarsInPage(pagination.currentPageNumber);
  if (cars) {
    const carsToStart = cars.map(
      (car: { name: string; color: string; id: number }) =>
        carsListView.cars.find((view) => view.id === car.id),
    );

    await Promise.all(carsToStart.map((carView: CarView) => startCar(carView)));
  }
}

export async function resetRace(carsListView: CarsListView) {
  iswinner = false;
  const carsToReset = carsListView.cars.filter(
    (carView) =>
      carView.carSvgElement?.getView().style.transform !== 'translateX(0px)',
  );

  await Promise.all(carsToReset.map((carView) => restartCar(carView)));
}

function showWinner(car: CarView) {
  const name = car.carNameElement?.getView().textContent;
  if (name) {
    const winner = new WinnerView(name);
    document.body.append(winner.getView());
  }
}

async function saveWinner(car: CarView, timeDuration: number) {
  await checkifWinnerisExist(car, timeDuration);
}

async function checkifWinnerisExist(car: CarView, time: number) {
  const id = car.id;
  const winner = await getWinner(id);

  if (winner) {
    updateTimeAndCountofWin(winner, time);
  } else {
    const wins = 1;
    await createWinner({ id, wins, time });
  }
}

async function updateTimeAndCountofWin(
  winner: {
    id: number;
    wins: number;
    time: number;
  },
  time: number,
) {
  const count = winner.wins + 1;
  const seconds = parseFloat((time / 1000).toFixed(2));
  const newTime = Math.min(winner.time, seconds);
  await updateWinner(winner.id, { wins: count, time: newTime });
}
