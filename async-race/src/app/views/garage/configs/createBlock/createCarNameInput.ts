import BaseView from '../../../baseView';

class CreateCarNameInput extends BaseView {
  private input: HTMLInputElement | null = null;
  constructor() {
    super({ tag: 'input', classNames: ['create-car-input'] });
    const currInput = this.getView();

    if (currInput instanceof HTMLInputElement) {
      this.input = currInput;
      this.input.type = 'text';
    }
  }
}
export default CreateCarNameInput;
