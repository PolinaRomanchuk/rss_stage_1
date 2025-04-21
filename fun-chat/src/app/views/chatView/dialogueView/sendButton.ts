import BaseView from "../../baseView";

class SendButton extends BaseView {
  private onClick: () => void;

  constructor(onClick: () => void) {
    super({ tag: 'button', classNames: ['send-button'], textContent: 'Send', callback: onClick });

    this.onClick = onClick;
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

  public addEnterKeyListener(): void {
    document.addEventListener('keydown', this.enterKeyHandler);
  }

  private enterKeyHandler = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.onClick();
    }
  }
}
export default SendButton;