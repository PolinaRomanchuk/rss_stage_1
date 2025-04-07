import BaseView from '../../baseView';
import CarsListView from '../carsList/carsListView';
import { generateCars } from '../../../services/garageServices';
import Pagination from '../../../utils/pagination';

class GenerateCarsBtn extends BaseView {
  constructor(carsList: CarsListView, pagination: Pagination<{ name: string; color: string; id: number; }>) {
    super({
      tag: 'button',
      classNames: ['generate-cars-button'],
      textContent: 'Generate cars',
      callback: () => generateCars(carsList, pagination),
    }, true);
  }
}
export default GenerateCarsBtn;
