type InputPurpose = 'create' | 'update';

import {
  saveGarageStateToStorage,
  setInputName,
  setInputColor,
  setUpdateInputName,
  setUpdateInputColor,
} from '../states/garageState';
import BaseView from '../views/baseView';

class InputView extends BaseView {
  private input: HTMLInputElement | null = null;
  private purpose: InputPurpose;

  constructor(purpose: InputPurpose) {
    super({ tag: 'input', classNames: ['set-car-input'] });
    this.purpose = purpose;

    const currInput = this.getView();
    if (currInput instanceof HTMLInputElement) {
      this.input = currInput;

      this.input.addEventListener('input', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || !this.input) return;
        this.input.value = target.value;
        this.updateState(target.value);
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
      this.updateState(value);
    }
  }

  public setType(type: string): void {
    if (this.input) this.input.type = type;
  }

  public reset(): void {
    this.setValue(this.input?.type === 'color' ? '#000000' : '');
  }

  private updateState(value: string): void {
    if (!this.input) return;

    const type = this.input.type;

    if (type === 'text') {
      if (this.purpose === 'create') {
        setInputName(value);
      } else {
        setUpdateInputName(value);
      }
    }

    if (type === 'color') {
      if (this.purpose === 'create') {
        setInputColor(value);
      } else {
        setUpdateInputColor(value);
      }
    }

    saveGarageStateToStorage();
  }

}
export default InputView;
