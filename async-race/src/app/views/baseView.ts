import { ElementCreator, ElementParams } from '../utils/elementCreator';

class BaseView {
  private baseElement: HTMLElement;
  private children: BaseView[] = [];

  constructor(params: ElementParams) {
    this.baseElement = new ElementCreator(params).getElement();
  }

  public append(child: BaseView | HTMLElement): void {
    if (child instanceof BaseView) {
      this.children.push(child);
      this.baseElement.append(child.getView());
    } else {
      this.baseElement.append(child);
    }
  }

  public appendChildren(children: (BaseView | HTMLElement | null)[]): void {
    children.forEach((el) => {
      if (el) {
        this.append(el);
      }
    });
  }

  public getView(): HTMLElement {
    return this.baseElement;
  }

  public changeClass(
    action: 'add' | 'remove' | 'toggle',
    className: string | string[],
  ): void {
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

  public removeAllChildren(): void {
    this.children.forEach((child) => {
      child.removeView();
    });
    this.children.length = 0;
  }

  public removeView(): void {
    this.baseElement.remove();
  }
}

export default BaseView;
