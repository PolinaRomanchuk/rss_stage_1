import BaseView from '../../view/baseView';
import '../modalWindow/modalWindow.css'

class ModalWindow extends BaseView {
  private contentContainer: BaseView;
  private closeButton: BaseView;

  constructor() {
    super({
      tag: 'div',
      classNames: ['modal-window-overlay'],
    });

    const modalContainer = new BaseView({ tag: 'div', classNames: ['modal-window-container'] });

    this.closeButton = new BaseView({
      tag: 'button',
      classNames: ['modal-close'],
      textContent: '✖',
      callback: () => this.close(),
    });

    this.contentContainer = new BaseView({ tag: 'div', classNames: ['modal-window-content-container'] });

    modalContainer.appendChildren([this.closeButton, this.contentContainer]);
    this.append(modalContainer);
  }

  public setContent(content: HTMLElement): void {
    this.contentContainer.append(content);
  }

  public open(): void {
    document.body.append(this.getBaseElement());
  }

  public close(): void {
    this.removeElement();
  }
}

export default ModalWindow;
