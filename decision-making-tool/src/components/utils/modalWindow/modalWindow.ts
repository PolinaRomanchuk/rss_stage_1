import BaseView from '../../view/baseView';
import '../modalWindow/modalWindow.css';

class ModalWindow extends BaseView {
  private contentContainer: BaseView;
  private closeButton: BaseView;
  private isActive: boolean = false;

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

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.close();
    });

    this.getBaseElement().addEventListener('click', (event) => {
      if (event.target === this.getBaseElement()) {
        this.close();
      }
    });
  }

  public setContent(content: HTMLElement): void {
    this.contentContainer.append(content);
  }

  public open(): void {
    document.body.append(this.getBaseElement());
    this.isActive = true;
    this.setOverflow();
  }

  public close(): void {
    this.removeElement();
    this.isActive = false;
    this.setOverflow();
  }

  private setOverflow() {
    if (this.isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}

export default ModalWindow;
