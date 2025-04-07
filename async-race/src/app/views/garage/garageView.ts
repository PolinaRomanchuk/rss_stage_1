import BaseView from '../baseView';
import CarsListView from './carsList/carsListView';
import ConfigsView from './configs/configsView';
import Pagination from '../../utils/pagination';
import '../garage/garage.css';
import {
  getGarageState,
  setCurrentPage,
  saveGarageStateToStorage,
} from '../../states/garageState';

class GarageView extends BaseView {
  private LIMIT_PAGES: number = 7;
  public carsList: CarsListView;

  constructor() {
    super({
      tag: 'div',
      classNames: ['garage-container'],
    });
    const carsList = new CarsListView();

    const garageState = getGarageState();


    const pagination = new Pagination(async (page, limit) => {
      const { cars, totalCount } = await carsList.getCarsAndCounter(
        page,
        limit,
      );
      return { items: cars, totalCount };
    }, this.LIMIT_PAGES, (page: number) => {
      setCurrentPage(page);
      saveGarageStateToStorage();
    },
      garageState.currentPage);
    carsList.setPagination(pagination);
    const configs = new ConfigsView(carsList, pagination);
    carsList.getUpdateBlock(configs.updateBlock);
    const nameView = new BaseView({
      tag: 'div',
      classNames: ['current-view-name'],
      textContent: 'Garage',
    });
    this.carsList = carsList;

    this.appendChildren([configs, nameView, carsList, pagination]);
  }
}

export default GarageView;
