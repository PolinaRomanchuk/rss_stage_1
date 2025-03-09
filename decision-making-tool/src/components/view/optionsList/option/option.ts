import BaseView from '../../baseView';
import '../option/option.css';

class Option extends BaseView {
  private indexElement: HTMLElement;
  private titleInput: HTMLInputElement;
  private weightInput: HTMLInputElement;
  private deleteButton: HTMLElement;

  constructor(index: number, onDelete: (option: Option) => void) {
    super({ tag: 'div', classNames: ['option-container'] });
    this.indexElement = new BaseView({
      tag: 'span',
      classNames: ['option-index'],
      textContent: `#${index}`,
    }).getBaseElement();

    this.titleInput = document.createElement('input');
    this.titleInput.type = 'text';
    this.titleInput.placeholder = 'enter title';
    this.titleInput.classList.add('option-title');

    this.weightInput = document.createElement('input');
    this.weightInput.type = 'number';
    this.weightInput.placeholder = 'enter weight';
    this.weightInput.classList.add('option-weight');

    this.deleteButton = new BaseView({
      tag: 'button',
      classNames: ['option-delete'],
      textContent: 'Delete',
      callback: () => onDelete(this),
    }).getBaseElement();

    this.appendChildren([this.indexElement, this.titleInput, this.weightInput, this.deleteButton]);
  }

  public getData(): { name: string; weight: number } {
    return {
      name: this.titleInput.value,
      weight: Number(this.weightInput.value) || 0,
    };
  }
  public updateIndex(index: number): void {
    this.indexElement.textContent = `#${index + 1}`;
  }
 
}
export default Option;
