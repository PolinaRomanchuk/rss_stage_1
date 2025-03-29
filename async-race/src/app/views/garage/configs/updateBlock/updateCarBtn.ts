import BaseView from '../../../baseView';

class UpdateCarBtn extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['update-car-button'],
      textContent: 'update',
    });
  }
}
export default UpdateCarBtn;
