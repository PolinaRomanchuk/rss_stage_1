import BaseView from '../../../baseView';
import UpdateCarBtn from './updateCarBtn';
import SetCarColorInput from '../setCarColorInput';
import SetCarNameInput from '../setCarNameInput';
import CarsListView from '../../carsList/carsListView';

class UpdateCarView extends BaseView {
  private nameInput: SetCarNameInput;
  private colorInput: SetCarColorInput;

  constructor(carsList: CarsListView) {
    super({
      tag: 'div',
      classNames: ['update-car-container'],
    });
    const name = new SetCarNameInput(carsList);
    this.nameInput = name;
    const color = new SetCarColorInput(carsList);
    this.colorInput = color;
    const button = new UpdateCarBtn(carsList, name, color);
    this.appendChildren([name, color, button]);
  }
}
export default UpdateCarView;
