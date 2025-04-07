import InputView from '../../../../utils/inputView';
import BaseView from '../../../baseView';
import CarsListView from '../../carsList/carsListView';
import { updateCarByApi } from '../../../../services/garageServices';
import Pagination from '../../../../utils/pagination';
import UpdateCarView from './updateCarView';
import { Car } from '../../../../../types/types';

class UpdateCarBtn extends BaseView {
  constructor(
    carsList: CarsListView,
    nameInput: InputView,
    colorInput: InputView,
    pagination: Pagination<Car>,
    updateCarView: UpdateCarView
  ) {
    super({
      tag: 'button',
      classNames: ['update-car-button'],
      textContent: 'update',
      callback: () => {
        updateCarByApi(carsList, nameInput, colorInput, pagination);
        nameInput.reset();
        colorInput.reset();
        updateCarView.setDisabledState(true);
      },
    }, true, true);
  }

}
export default UpdateCarBtn;
