import BaseView from '../../baseView';
import CarView from './car/carView';
import {
  deleteCarByApi,
  fetchCarByApi,
  fetchCarsByApi,
} from '../../../services/garageServices';
import Pagination from '../../../utils/pagination';
import UpdateCarView from '../configs/updateBlock/updateCarView';

class CarsListView extends BaseView {
  public cars: CarView[] = [];
  public selectedCar: CarView | null = null;
  private carsCounterElement: HTMLElement | null = null;
  private pagination: Pagination<{
    name: string;
    color: string;
    id: number;
  }> | null = null;

  private updateBlock: UpdateCarView | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['cars-list-container'] });
  }

  public async getCarsAndCounter(
    currPage: number,
    limit: number
  ): Promise<{
    cars: { name: string; color: string; id: number }[];
    totalCount: number;
  }> {
    const { cars, totalCount } = await fetchCarsByApi(currPage, limit);
    this.drawCars(cars);
    this.updateCarsCounter(totalCount);
    return { cars, totalCount };
  }

  public setPagination(
    pagination: Pagination<{ name: string; color: string; id: number }>
  ) {
    this.pagination = pagination;
  }

  public getUpdateBlock(updateBlock: UpdateCarView | null) {
    this.updateBlock = updateBlock;
  }

  private drawCars(cars: { name: string; color: string; id: number }[]): void {
    this.removeAllChildren();
    this.drawCarsCounter();

    cars.forEach((car) => {
      const newCar = new CarView(
        car,
        this.deleteCar.bind(this),
        this.selectCar.bind(this)
      );

      this.cars.push(newCar);
      this.append(newCar);
    });
  }

  private async deleteCar(car: CarView): Promise<void> {
    if (this.pagination) await deleteCarByApi(this, car.carId, this.pagination);
    this.cars = this.cars.filter((cr) => cr !== car);
    car.removeView();
  }

  private async selectCar(car: CarView): Promise<void> {
    await fetchCarByApi(car.carId);
    this.selectedCar = car;
    if (this.updateBlock?.nameInput && this.updateBlock.colorInput) {
      this.updateBlock.nameInput.value = car.carName;
      this.updateBlock.colorInput.value = car.carColor;
    }
  }

  private drawCarsCounter(): void {
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
}
export default CarsListView;
