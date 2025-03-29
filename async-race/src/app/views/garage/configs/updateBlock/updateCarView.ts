import BaseView from '../../../baseView';
import UpdateCarBtn from './updateCarBtn';
import SetCarColorInput from '../setCarColorInput';
import SetCarNameInput from '../setCarNameInput';

class UpdateCarView extends BaseView {
  constructor() {
    super({ tag: 'div', classNames: ['update-car-container'] });
    const name = new SetCarNameInput();
    const color = new SetCarColorInput();
    const button = new UpdateCarBtn();
    this.appendChildren([name, color, button]);
  }
}
export default UpdateCarView;