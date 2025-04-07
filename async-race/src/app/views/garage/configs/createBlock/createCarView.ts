import BaseView from '../../../baseView';
import CreateCarBtn from './createCarBtn';
import CarsListView from '../../carsList/carsListView';
import InputView from '../../../../utils/inputView';
import Pagination from '../../../../utils/pagination';

import { getGarageState } from '../../../../states/garageState';

class CreateCarView extends BaseView {

  constructor(
    carsList: CarsListView,
    pagination: Pagination<{ name: string; color: string; id: number }>,
  ) {
    super({ tag: 'div', classNames: ['create-car-container'] });

    const name = this.drawNameInput();
    const color = this.drawColorInput();
    const button = new CreateCarBtn(carsList, name, color, pagination);

    this.appendChildren([name, color, button]);
  }

  private drawNameInput(): InputView {
    const name = new InputView('create');
    name.setType('text');
    name.addClass(['car-name-input']);
    const { inputName } = getGarageState();
    name.setValue(inputName);
    return name;
  }

  private drawColorInput(): InputView {
    const color = new InputView('create');
    color.setType('color');
    color.addClass(['car-color-input']);
    const { inputColor } = getGarageState();
    color.setValue(inputColor);
    return color;
  }
}
export default CreateCarView;
