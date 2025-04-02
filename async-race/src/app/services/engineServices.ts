import CarView from '../views/garage/carsList/car/carView';
import { startOrStopEngine, switchDriveMode } from '../API/engine';

let activeAnimation: number | null = null;
let cancelAnimation = false;

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
