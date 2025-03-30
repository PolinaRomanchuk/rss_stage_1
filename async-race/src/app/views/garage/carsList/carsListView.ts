import BaseView from '../../baseView';
import CarView from './car/carView';
import { getCars } from '../../../API/garage';
import CarsCounterView from '../carsCounterView';

class CarsListView extends BaseView {
  public cars: CarView[] = [];
  public carsCounter: number = 0;
  public carsCounterElement: HTMLElement | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['cars-list-container'] });
    this.getCars();
    this.createCarsCounter();
    this.append(this.createCarsCounter());
  }
  public updateCarsCounter(totalCount: number): void {
    if (this.carsCounterElement) {
      this.carsCounterElement.textContent = `${totalCount} cars`;
    }
  }

  private createCarsCounter(): CarsCounterView {
    const carsCounter = new CarsCounterView();
    this.carsCounterElement = carsCounter.getView();
    return carsCounter;
  }

  public async getCars() {
    try {
      const { cars, totalCount } = await getCars();
      this.drawCars(cars);
      this.updateCarsCounter(totalCount);
    } catch (error) {
      console.error('Error');
    }
  }

  private drawCars(cars: { name: string; color: string; id: number }[]): void {
    this.removeAllChildren();
    cars.forEach((car) => {
      const newCar = new CarView(car);
      this.cars.push(newCar);
      this.append(newCar);
    });
  }
  public createCar(car: { name: string; color: string; id: number }): void {
    const newCar = new CarView(car);
    this.cars.push(newCar);
    this.append(newCar);
  }

  private addCar(): void {
    const newCar = new CarView();
    this.cars.push(newCar);
    this.append(newCar);
  }
}
export default CarsListView;
