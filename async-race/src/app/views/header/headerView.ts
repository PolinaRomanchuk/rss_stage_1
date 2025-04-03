import BaseView from '../baseView';
import ToGarageBtn from './toGarageBtn';
import ToWinnersBtn from './toWinnersBtn';
import '../header/header.css';
import RaceState from '../../states/raceState';
import { manageDisabledInRace } from '../../states/buttonsState';

class HeaderView extends BaseView {
  private buttons: HTMLButtonElement[] = [];

  constructor() {
    super({ tag: 'div', classNames: ['header-container'] });
    const garageBtn = new ToGarageBtn();
    const winnersBtn = new ToWinnersBtn();
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
}
export default HeaderView;
