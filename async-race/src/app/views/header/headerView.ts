import BaseView from '../baseView';
import ToGarageBtn from './toGarageBtn';
import ToWinnersBtn from './toWinnersBtn';
import '../header/header.css'

class HeaderView extends BaseView {
  constructor() {
    super({ tag: 'div', classNames: ['header-container'] });
    const garageBtn = new ToGarageBtn();
    const winnersBtn = new ToWinnersBtn();
    this.appendChildren([garageBtn, winnersBtn]);
  }
}
export default HeaderView;
