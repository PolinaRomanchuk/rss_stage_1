import BaseView from "../../../baseView";

class RestartBtn extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['restart-button'],
      textContent: 'B',
    });
  }
}
export default RestartBtn;