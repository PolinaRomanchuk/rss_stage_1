import BaseView from '../../../baseView';
import CreateCarBtn from './createCarBtn';
import CarsListView from '../../carsList/carsListView';
import InputView from '../../../../utils/inputView';
import Pagination from '../../../../utils/pagination';

class CreateCarView extends BaseView {
  constructor(carsList: CarsListView, pagination: Pagination<void>) {
    super({ tag: 'div', classNames: ['create-car-container'] });

    const name = this.drawNameInput();
    const color = this.drawColorInput();
    const button = new CreateCarBtn(carsList, name, color, pagination);

    this.appendChildren([name, color, button]);
  }

  private drawNameInput(): InputView {
    const name = new InputView();
    name.setType('text');
    name.addClass(['car-name-input']);
    return name;
  }

  private drawColorInput(): InputView {
    const color = new InputView();
    color.setType('color');
    color.addClass(['car-color-input']);
    return color;
  }
}
export default CreateCarView;
