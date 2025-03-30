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
    const carsList = new CarsListView();
    const pagination = new Pagination();
    const configs = new ConfigsView(carsList);
    const nameView = new BaseView({
      tag: 'div',
      classNames: ['current-view-name'],
      textContent: 'Garage',
    });
    

    this.appendChildren([configs, nameView, carsList, pagination]);
  }
}

export default GarageView;
