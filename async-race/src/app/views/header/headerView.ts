import BaseView from '../baseView';
import ToGarageBtn from './toGarageBtn';
import ToWinnersBtn from './toWinnersBtn';
import '../header/header.css';
import GarageView from '../garage/garageView';
import CarsListView from '../garage/carsList/carsListView';

class HeaderView extends BaseView {
  public cars: CarsListView | null = null;
  private winnersBtn: ToWinnersBtn;

  constructor() {
    super({ tag: 'div', classNames: ['header-container'] });
    const garageBtn = new ToGarageBtn();
    const winnersBtn = new ToWinnersBtn();

    this.winnersBtn = winnersBtn;
    this.appendChildren([garageBtn, winnersBtn]);
  }

  public setCars(garageView: GarageView) {
    this.cars = garageView.carsList;
    this.winnersBtn.setCarsList(this.cars);
  }
}
export default HeaderView;
