import BaseView from '../../../baseView';
import UpdateCarBtn from './updateCarBtn';
import CarsListView from '../../carsList/carsListView';
import InputView from '../../../../utils/inputView';
import Pagination from '../../../../utils/pagination';

class UpdateCarView extends BaseView {
  constructor(carsList: CarsListView, pagination: Pagination<{ name: string; color: string; id: number; }>) {
    super({
      tag: 'div',
      classNames: ['update-car-container'],
    });
    const name = this.drawNameInput();
    const color = this.drawColorInput();
    const button = new UpdateCarBtn(carsList, name, color,  pagination);
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
export default UpdateCarView;
