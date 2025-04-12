import BaseView from '../views/baseView';

class InputView extends BaseView {
  private input: HTMLInputElement | null = null;
  private validFunc: ((value: string) => string) | null = null;
  private validSpan: BaseView | null = null;

  constructor() {
    super({ tag: 'input' });

    const currInput = this.getView();
    if (currInput instanceof HTMLInputElement) {
      this.input = currInput;

      this.input.addEventListener('input', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || !this.input) return;
        this.input.value = target.value;
        this.isValid(target.value);
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

  public setPlaceholder(value: string): void {
    if (this.input) {
      this.input.placeholder = value;
    }
  }

  public setType(type: string): void {
    if (this.input) this.input.type = type;
  }

  public reset(): void {
    this.setValue('');
  }

  public isValid(value: string): void {
    if (!this.validFunc || !this.input) return;
    const result = this.validFunc(value);

    if (result !== "ok" && this.validSpan) {
      this.validSpan.setTextContent(result);
    } else if (result === "ok" && this.validSpan) {
      this.validSpan.setTextContent('');
    }
  }

  public setValidFunction(func: (value: string) => string): void {
    this.validFunc = func;
  }
  public setValidSpan(span: BaseView): void {
    this.validSpan = span;
  }
}

export default InputView;