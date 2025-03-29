import BaseView from '../../baseView';

class SetCarColorInput extends BaseView {
  private input: HTMLInputElement | null = null;
  constructor() {
    super({ tag: 'input', classNames: ['create-car-color'] });
    const currInput = this.getView();

    if (currInput instanceof HTMLInputElement) {
      this.input = currInput;
      this.input.type = 'color';
    }
  }
}
export default SetCarColorInput;
