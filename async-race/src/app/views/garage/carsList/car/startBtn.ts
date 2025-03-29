import BaseView from "../../../baseView";

class StartBtn extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['start-button'],
      textContent: 'A',
    });
  }
}
export default StartBtn;