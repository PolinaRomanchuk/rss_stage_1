import BaseView from '../baseView';
import CarsListView from './carsList/carsListView';
import ConfigsView from './configs/configsView';
import Pagination from '../../utils/pagination';
import '../garage/garage.css';

class GarageView extends BaseView {
  private LIMIT_PAGES: number = 7;

  constructor() {
    super({
      tag: 'div',
      classNames: ['garage-container'],
    });
    const carsList = new CarsListView();
    const pagination = new Pagination(async (page, limit) => {
      await carsList.getCarsAndCounter(page, limit);
    }, this.LIMIT_PAGES);
    carsList.setPagination(pagination);
    const configs = new ConfigsView(carsList, pagination);
    const nameView = new BaseView({
      tag: 'div',
      classNames: ['current-view-name'],
      textContent: 'Garage',
    });

    this.appendChildren([configs, nameView, carsList, pagination]);
  }
}

export default GarageView;
