import BaseView from '../../baseView';
import CarView from './car/carView';
import { getCars, deleteCar, updateCar, getCar } from '../../../API/garage';
import CarsCounterView from '../carsCounterView';

class CarsListView extends BaseView {
  public cars: CarView[] = [];
  public carsCounter: number = 0;
  public carsCounterElement: HTMLElement | null = null;
  public selectedCar: CarView | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['cars-list-container'] });
  }
  public updateCarsCounter(totalCount: number): void {
    if (this.carsCounterElement) {
      this.carsCounterElement.textContent = `${totalCount} cars`;
    }
  }

  private createCarsCounter(): void {
    const carsCounter = new CarsCounterView();
    this.carsCounterElement = carsCounter.getView();
    this.append(carsCounter);
  }

  public async getCars(currPage: number, limit: number) {
    try {
      const { cars, totalCount } = await getCars(currPage, limit);
      this.drawCars(cars);
      this.updateCarsCounter(totalCount);
    } catch (error) {
      console.error('Error');
    }
  }

  public drawCars(cars: { name: string; color: string; id: number }[]): void {
    this.removeAllChildren();
    this.createCarsCounter();
    cars.forEach((car) => {
      const newCar = new CarView(
        car,
        this.deleteCar.bind(this),
        this.getCar.bind(this),
      );
      this.cars.push(newCar);
      this.append(newCar);
    });
  }

  public createCar(car: { name: string; color: string; id: number }): void {
    const newCar = new CarView(
      car,
      this.deleteCar.bind(this),
      this.getCar.bind(this),
    );
    this.cars.push(newCar);
    this.append(newCar);
  }

  public async deleteCar(car: CarView): Promise<void> {
    try {
      await deleteCar(car.id);
      this.cars = this.cars.filter((cr) => cr !== car);
      car.removeView();

      await this.getCars(1, 7);
    } catch (error) {
      console.error('Error');
    }
  }

  public async updateCar(car: CarView): Promise<void> {
    try {
      //  await updateCar(car.id, newname, newcolor);
      this.cars = this.cars.filter((cr) => cr !== car);
      //  car.removeView();

      await this.getCars(1, 7);
    } catch (error) {
      console.error('Error');
    }
  }

  public async getCar(car: CarView): Promise<void> {
    try {
      await getCar(car.id);
      this.selectedCar = car;
      console.log(car.id);
    } catch (error) {
      console.error('Error');
    }
  }
}
export default CarsListView;
