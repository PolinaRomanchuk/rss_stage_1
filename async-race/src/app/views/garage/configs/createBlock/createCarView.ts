import BaseView from '../../../baseView';
import CreateCarBtn from './createCarBtn';
import SetCarColorInput from '../setCarColorInput';
import SetCarNameInput from '../setCarNameInput';
import CarsListView from '../../carsList/carsListView';

class CreateCarView extends BaseView {
  constructor(carsList: CarsListView) {
    super({ tag: 'div', classNames: ['create-car-container'] });
    const name = new SetCarNameInput();
    const color = new SetCarColorInput();
    const button = new CreateCarBtn(carsList, name, color);
    this.appendChildren([name, color, button]);
  }
}
export default CreateCarView;
