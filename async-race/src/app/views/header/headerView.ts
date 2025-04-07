import BaseView from '../baseView';
import ToGarageBtn from './toGarageBtn';
import ToWinnersBtn from './toWinnersBtn';
import '../header/header.css';
import RaceState from '../../states/raceState';
import { manageDisabledInRace } from '../../states/buttonsState';
import GarageView from '../garage/garageView';
import CarsListView from '../garage/carsList/carsListView';

class HeaderView extends BaseView {
  private buttons: HTMLButtonElement[] = [];
  public cars: CarsListView | null = null;
  private winnersBtn: ToWinnersBtn;

  constructor() {
    super({ tag: 'div', classNames: ['header-container'] });
    const garageBtn = new ToGarageBtn();
    const winnersBtn = new ToWinnersBtn();
    this.winnersBtn = winnersBtn;
    this.appendChildren([garageBtn, winnersBtn]);

    const garage = garageBtn.getView();
    const winners = winnersBtn.getView();
    if (
      garage instanceof HTMLButtonElement &&
      winners instanceof HTMLButtonElement
    ) {
      this.buttons.push(garage, winners);
    }

    if (this.buttons) {
      RaceState.getInstance().subscribe(() => manageDisabledInRace(this.buttons));
    }
  }

  public setCars(garageView: GarageView) {
    this.cars = garageView.carsList;
    this.winnersBtn.setCarsList(this.cars);
  }
}
export default HeaderView;
