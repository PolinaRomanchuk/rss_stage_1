import BaseView from '../../baseView';
import { generateCars } from '../../../services/garageServices';
import Pagination from '../../../utils/pagination';
import { Car } from '../../../../types/types';

class GenerateCarsBtn extends BaseView {
  constructor(pagination: Pagination<Car>) {
    super({
      tag: 'button',
      classNames: ['generate-cars-button'],
      textContent: 'Generate cars',
      callback: () => generateCars(pagination),
    }, true);
  }
}
export default GenerateCarsBtn;
