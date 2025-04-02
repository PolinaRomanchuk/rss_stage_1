import { resetRace } from '../../../services/engineServices';
import BaseView from '../../baseView';
import CarsListView from '../carsList/carsListView';

class ResetBtn extends BaseView {
  constructor(carsListView: CarsListView) {
    super({
      tag: 'button',
      classNames: ['reset-button'],
      textContent: 'Reset',
      callback: () => resetRace(carsListView),
    });
  }
}
export default ResetBtn;
