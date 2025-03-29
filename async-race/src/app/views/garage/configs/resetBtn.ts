import BaseView from "../../baseView";

class ResetBtn extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['reset-button'],
      textContent: 'Reset',
    });
  }
}
export default ResetBtn;