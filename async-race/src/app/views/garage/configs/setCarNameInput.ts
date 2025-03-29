import BaseView from '../../baseView';

class SetCarNameInput extends BaseView {
  private input: HTMLInputElement | null = null;
  constructor() {
    super({ tag: 'input', classNames: ['set-car-input', 'car-name-input'] });
    const currInput = this.getView();

    if (currInput instanceof HTMLInputElement) {
      this.input = currInput;
      this.input.type = 'text';
    }
  }
}
export default SetCarNameInput;
