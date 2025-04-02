import { restartCar } from '../../../../services/engineServices';
import BaseView from '../../../baseView';
import CarView from './carView';

class RestartBtn extends BaseView {
  constructor(car: CarView) {
    super({
      tag: 'button',
      classNames: ['restart-button'],
      textContent: 'B',
      callback: () => restartCar(car),
    });
  }
}
export default RestartBtn;
