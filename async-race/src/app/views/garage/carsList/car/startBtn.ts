import BaseView from '../../../baseView';
import CarView from './carView';
import { startCar } from '../../../../services/engineServices';

class StartBtn extends BaseView {
  constructor(car: CarView) {
    super({
      tag: 'button',
      classNames: ['start-button'],
      textContent: 'A',
      callback: () => startCar(car),
    });
  }
}
export default StartBtn;
