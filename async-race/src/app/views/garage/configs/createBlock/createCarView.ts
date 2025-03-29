import BaseView from '../../../baseView';
import CreateCarBtn from './createCarBtn';
import CreateCarColorInput from './createCarColorInput';
import CreateCarNameInput from './createCarNameInput';

class CreateCarView extends BaseView {
  constructor() {
    super({ tag: 'div', classNames: ['create-car-container'] });
    const name = new CreateCarNameInput();
    const color = new CreateCarColorInput();
    const button = new CreateCarBtn();
    this.appendChildren([name, color, button]);
  }
}
export default CreateCarView;
