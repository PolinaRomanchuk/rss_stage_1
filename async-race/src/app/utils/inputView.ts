import BaseView from '../views/baseView';

class InputView extends BaseView {
  private input: HTMLInputElement | null = null;

  constructor() {
    super({ tag: 'input', classNames: ['set-car-input'] });
    const currInput = this.getView();

    if (currInput instanceof HTMLInputElement) {
      this.input = currInput;
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

  public setValue(value: string): void {
    if (this.input) {
      this.input.value = value;
    }
  }

  public setType(type: string): void {
    if (this.input) this.input.type = type;
  }
}
export default InputView;
