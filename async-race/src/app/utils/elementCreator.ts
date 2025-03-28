interface ElementParams {
  tag: keyof HTMLElementTagNameMap;
  classNames?: string[];
  textContent?: string;
  callback?: (event: Event) => void;
}

class ElementCreator {
  private element: HTMLElement;

  constructor(params: ElementParams) {
    this.element = this.createElement(params);
  }

  getElement(): HTMLElement {
    return this.element;
  }

  createElement(params: ElementParams): HTMLElement {
    const element = document.createElement(params.tag);
    this.setCssClasses(element, params.classNames);
    this.setTextContent(element, params.textContent);
    this.setCallback(element, params.callback);
    return element;
  }

  setCssClasses(element: HTMLElement, cssClasses: string[] = []): void {
    element.classList.add(...cssClasses);
  }

  setTextContent(element: HTMLElement, text: string = ''): void {
    element.textContent = text;
  }

  setCallback(element: HTMLElement, callback?: (event: Event) => void): void {
    if (callback) {
      element.addEventListener('click', callback);
    }
  }
}
export { ElementCreator, ElementParams };
