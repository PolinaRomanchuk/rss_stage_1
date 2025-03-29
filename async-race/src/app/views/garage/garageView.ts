import BaseView from '../baseView';
import CarsListView from './carsList/carsListView';
import ConfigsView from './configs/configsView';
import Pagination from './pagination';
import '../garage/garage.css';

class GarageView extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['garage-container'],
    });
    const configs = new ConfigsView();
    const nameView = new BaseView({
      tag: 'div',
      classNames: ['current-view-name'],
      textContent: 'Garage',
    });
    const carsList = new CarsListView();
    const pagination = new Pagination();

    this.appendChildren([configs, nameView, carsList, pagination]);
  }
}

export default GarageView;
