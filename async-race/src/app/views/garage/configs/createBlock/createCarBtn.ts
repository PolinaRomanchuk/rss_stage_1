import BaseView from '../../../baseView';

class CreateCarBtn extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['create-car-button'],
      textContent: 'create',
    });
  }
}
export default CreateCarBtn;
