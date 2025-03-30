import BaseView from '../../../baseView';
import UpdateCarBtn from './updateCarBtn';
import CarsListView from '../../carsList/carsListView';
import InputView from '../../../../utils/inputView';

class UpdateCarView extends BaseView {
  constructor(carsList: CarsListView) {
    super({
      tag: 'div',
      classNames: ['update-car-container'],
    });
    const name = this.createNameInput();
    const color = this.createColorInput();
    const button = new UpdateCarBtn(carsList, name, color);
    this.appendChildren([name, color, button]);
  }

  private createNameInput(): InputView {
    const name = new InputView();
    name.setType('text');
    name.addClass(['car-name-input']);
    return name;
  }

  private createColorInput(): InputView {
    const color = new InputView();
    color.setType('color');
    color.addClass(['car-color-input']);
    return color;
  }
}
export default UpdateCarView;
