import { startRace } from '../../../services/engineServices';
import Pagination from '../../../utils/pagination';
import BaseView from '../../baseView';
import CarsListView from '../carsList/carsListView';

class RaceBtn extends BaseView {
  constructor(pagination: Pagination<void>, carsListView: CarsListView) {
    super({
      tag: 'button',
      classNames: ['race-button'],
      textContent: 'Race',
      callback: () => startRace(pagination, carsListView),
    });
  }
}
export default RaceBtn;
