import BaseView from '../../baseView';
import CarView from './car/carView';
import { getCars, deleteCar, getCar } from '../../../API/garage';
import { deleteWinner, getWinner } from '../../../API/winners';


class CarsListView extends BaseView {
  public cars: CarView[] = [];
  public carsCounter: number = 0;
  public carsCounterElement: HTMLElement | null = null;
  public selectedCar: CarView | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['cars-list-container'] });
  }

  public async getCarsAndCounterByApi(
    currPage: number,
    limit: number,
  ): Promise<void> {
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
        this.selectCar.bind(this),
      );

      this.cars.push(newCar);
      this.append(newCar);
    });
  }

  public async deleteCar(car: CarView): Promise<void> {
    try {
      await deleteCar(car.id);
      this.cars = this.cars.filter((cr) => cr !== car);
      car.removeView();

      await this.getCarsAndCounterByApi(1, 7);
      await this.checkWinners(car);
    } catch (error) {
      console.error('Error');
    }
  }

  public async updateCar(car: CarView): Promise<void> {
    try {
      this.cars = this.cars.filter((cr) => cr !== car);

      await this.getCarsAndCounterByApi(1, 7);
    } catch (error) {
      console.error('Error');
    }
  }

  public async selectCar(car: CarView): Promise<void> {
    try {
      await getCar(car.id);
      this.selectedCar = car;
      console.log(car.id);
    } catch (error) {
      console.error('Error');
    }
  }

  private createCarsCounter(): void {
    const carsCounter = new BaseView({
      tag: 'span',
      classNames: ['cars-counter'],
      textContent: '0 cars',
    });
    this.carsCounterElement = carsCounter.getView();
    this.append(carsCounter);
  }

  private updateCarsCounter(totalCount: number): void {
    if (this.carsCounterElement) {
      this.carsCounterElement.textContent = `${totalCount} cars`;
    }
  }

  private async checkWinners(car: CarView): Promise<void> {
    const winner = await getWinner(car.id);
    if (winner) {
      await deleteWinner(car.id);
    }
  }
}
export default CarsListView;
