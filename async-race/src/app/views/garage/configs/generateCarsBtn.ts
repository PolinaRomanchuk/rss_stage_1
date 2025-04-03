import BaseView from '../../baseView';
import CarsListView from '../carsList/carsListView';
import { generateCars } from '../../../services/garageServices';
import Pagination from '../../../utils/pagination';

class GenerateCarsBtn extends BaseView {
  constructor(carsList: CarsListView, pagination: Pagination<void>) {
    super({
      tag: 'button',
      classNames: ['generate-cars-button'],
      textContent: 'Generate cars',
      callback: () => generateCars(carsList, pagination),
    });
  }
}
export default GenerateCarsBtn;
