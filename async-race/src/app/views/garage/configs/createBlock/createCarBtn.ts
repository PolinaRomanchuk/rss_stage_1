import BaseView from '../../../baseView';
import InputView from '../../../../utils/inputView';
import { createCarByApi } from '../../../../services/garageServices';
import Pagination from '../../../../utils/pagination';
import { Car } from '../../../../../types/types';

class CreateCarBtn extends BaseView {
  constructor(nameInput: InputView, colorInput: InputView, pagination: Pagination<Car>) {
    super({
      tag: 'button',
      classNames: ['create-car-button'],
      textContent: 'create',
      callback: () => {
        createCarByApi(nameInput, colorInput, pagination);
        nameInput.reset();
        colorInput.reset();
      },
    }, true);
  }
}
export default CreateCarBtn;
