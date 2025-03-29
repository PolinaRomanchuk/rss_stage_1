import BaseView from '../../baseView';
import CarView from './car/carView';

class CarsListView extends BaseView {
  public cars: CarView[] = [];
  constructor() {
    super({ tag: 'div', classNames: ['cars-list-container'] });
    this.addCar();
  }

  private addCar(): void {
    const newCar = new CarView();
    this.cars.push(newCar);
    this.append(newCar);
  }
}
export default CarsListView;
