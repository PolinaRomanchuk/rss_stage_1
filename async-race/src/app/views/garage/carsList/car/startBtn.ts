import BaseView from '../../../baseView';
import CarView from './carView';
import { startOrStopEngine } from '../../../../API/engine';
import { switchDriveMode } from '../../../../API/engine';

class StartBtn extends BaseView {
  constructor(car: CarView) {
    super({
      tag: 'button',
      classNames: ['start-button'],
      textContent: 'A',
      callback: () => this.startCar(car),
    });
  }

  private async loadData(
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

  private async startCar(car: CarView) {
    const data = await this.loadData(car.id);
    this.startDriving(car, data);
  }

  private async startDriving(
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

      let isCarBroken = false;

      requestAnimationFrame(function animate(time: number) {
        if (isCarBroken) return; 
        let timeFraction = (time - start) / timeDuration;
        if (timeFraction > 1) timeFraction = 1;

        draw(timeFraction);

        function draw(progress: number) {
          carElement.style.transform = `translateX(${progress * maxDistance}px)`;
        }

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });

      try {
        await switchDriveMode(car.id, 'drive');
      } catch (error) {
        isCarBroken = true;
      }
    }
  }
}
export default StartBtn;
