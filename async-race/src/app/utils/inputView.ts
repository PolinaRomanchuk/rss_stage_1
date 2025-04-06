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

        if (this.input.type === 'text') {
          if (this.purpose === 'create') {
            setInputName(this.input.value);
          } else {
            setUpdateInputName(this.input.value);
          }
        }

        if (this.input.type === 'color') {
          if (this.purpose === 'create') {
            setInputColor(this.input.value);
          } else {
            setUpdateInputColor(this.input.value);
          }
        }

        saveGarageStateToStorage();
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
      if (this.input.type === 'text') {
        if (this.purpose === 'create') {
          setInputName(value);
        } else {
          setUpdateInputName(value);
        }
      }

      if (this.input.type === 'color') {
        if (this.purpose === 'create') {
          setInputColor(value);
        } else {
          setUpdateInputColor(value);
        }
      }

      saveGarageStateToStorage();
    }

  }

  public setType(type: string): void {
    if (this.input) this.input.type = type;
  }
}
export default InputView;
