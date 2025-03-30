import BaseView from '../../baseView';

class SetCarNameInput extends BaseView {
  private input: HTMLInputElement | null = null;
  constructor() {
    super({ tag: 'input', classNames: ['set-car-input', 'car-name-input'] });
    const currInput = this.getView();

    if (currInput instanceof HTMLInputElement) {
      this.input = currInput;
      this.input.type = 'text';
      this.input.addEventListener('input', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || !this.input) return;
        this.input.value = target.value;
      });
    }
  }

  public getValue(): string {
    if (this.input) {
      return this.input.value;
    }
    return '';
  }
}
export default SetCarNameInput;
