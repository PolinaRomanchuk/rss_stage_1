import InputView from '../../../../utils/inputView';
import BaseView from '../../../baseView';
import CarsListView from '../../carsList/carsListView';
import { updateCarByApi } from '../../../../services/garageServices';
import Pagination from '../../../../utils/pagination';

class UpdateCarBtn extends BaseView {
  constructor(
    carsList: CarsListView,
    nameInput: InputView,
    colorInput: InputView,
    pagination: Pagination<{ name: string; color: string; id: number; }>
  ) {
    super({
      tag: 'button',
      classNames: ['update-car-button'],
      textContent: 'update',
      callback: () => updateCarByApi(carsList, nameInput, colorInput, pagination),
    });
  }
}
export default UpdateCarBtn;
