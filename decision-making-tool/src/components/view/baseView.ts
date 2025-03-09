import ElementCreator, { ElementParams } from '../utils/elementCreator';

class BaseView {
  private baseElement: HTMLElement;

  constructor(params: ElementParams) {
    this.baseElement = new ElementCreator(params).getElement();
  }

  public getBaseElement(): HTMLElement {
    return this.baseElement;
  }

  public changeClass(action: 'add' | 'remove' | 'toggle', className: string | string[]): void {
    const classes = Array.isArray(className) ? className : [className];
    classes.forEach((cls) => {
      this.baseElement.classList[action](cls);
    });
  }

  public addClass(className: string | string[]): void {
    this.changeClass('add', className);
  }

  public toggleClass(className: string | string[]): void {
    this.changeClass('toggle', className);
  }

  public removeClass(className: string | string[]): void {
    this.changeClass('remove', className);
  }
}

export default BaseView;
