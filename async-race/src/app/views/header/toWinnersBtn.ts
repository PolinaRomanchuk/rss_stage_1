import BaseView from '../baseView';
import router from '../../utils/router';
import { resetRace } from '../../services/engineServices';
import CarsListView from '../garage/carsList/carsListView';

class ToWinnersBtn extends BaseView {
  private carsList: CarsListView | null = null;

  constructor() {
    super({
      tag: 'button',
      classNames: ['to-winners-btn'],
      textContent: 'To winners',

    }, true);
    const button = this.getView();
    button.addEventListener('click', () => {
      if (this.carsList) {
        resetRace(this.carsList);
      }
      router.navigate('winners');
    });
  }
  public setCarsList(carsList: CarsListView) {
    this.carsList = carsList;
  }
}
export default ToWinnersBtn;
