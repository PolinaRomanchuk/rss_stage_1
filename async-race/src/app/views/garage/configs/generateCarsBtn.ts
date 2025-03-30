import { createCar } from '../../../API/garage';
import { getRandomCarName } from '../../../utils/carNames';
import BaseView from '../../baseView';
import CarsListView from '../carsList/carsListView';

class GenerateCarsBtn extends BaseView {
  private GENERATE_COUNT: number = 100;

  constructor(carsList: CarsListView) {
    super({
      tag: 'button',
      classNames: ['generate-cars-button'],
      textContent: 'Generate cars',
      callback: () => this.generateCars(carsList),
    });
  }
  private async generateCars(carsList: CarsListView) {
    try {
      const cars = Array.from({ length: this.GENERATE_COUNT }, () => ({
        name: getRandomCarName(),
        color: this.getRandomColor(),
      }));

      await Promise.all(cars.map((car) => createCar(car)));
      await carsList.getCars(1, 7);
    } catch (error) {
      console.error('Error');
    }
  }

  private getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
export default GenerateCarsBtn;
