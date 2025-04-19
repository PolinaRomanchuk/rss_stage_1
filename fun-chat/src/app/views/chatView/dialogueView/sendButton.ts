import BaseView from "../../baseView";

class SendButton extends BaseView {
  private onClickHandler: () => void;

  constructor(onClick: () => void) {
    super({ tag: 'button', classNames: ['send-button'], textContent: 'Send' });

    this.onClickHandler = onClick;
    this.addClickListener();
    this.addEnterKeyListener();
  }

  public removeKeyHandler(): void {
    document.removeEventListener('keydown', this.enterKeyHandler);
  }

  public disableButton(): void {
    const btn = this.getView();
    if (btn instanceof HTMLButtonElement) {
      btn.disabled = true;
    }
  }

  public enableButton(): void {
    const btn = this.getView();
    if (btn instanceof HTMLButtonElement) {
      btn.disabled = false;
    }
  }

  private addClickListener(): void {
    const btn = this.getView();
    if (btn instanceof HTMLButtonElement) {
      btn.addEventListener('click', this.onClickHandler);
    }
  }

  public addEnterKeyListener(): void {
    document.addEventListener('keydown', this.enterKeyHandler);
  }

  private enterKeyHandler = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.onClickHandler();
    }
  }
}
export default SendButton;