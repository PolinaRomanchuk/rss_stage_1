import BaseView from '../../../baseView';
import CarsListView from '../../carsList/carsListView';
import InputView from '../../../../utils/inputView';
import { createCarByApi } from '../../../../services/garageServices';
import Pagination from '../../../../utils/pagination';

class CreateCarBtn extends BaseView {
  constructor(
    carsList: CarsListView,
    nameInput: InputView,
    colorInput: InputView,
    pagination: Pagination<{ name: string; color: string; id: number; }>
  ) {
    super({
      tag: 'button',
      classNames: ['create-car-button'],
      textContent: 'create',
      callback: () => createCarByApi(carsList, nameInput, colorInput, pagination),
    });
  }
}
export default CreateCarBtn;
