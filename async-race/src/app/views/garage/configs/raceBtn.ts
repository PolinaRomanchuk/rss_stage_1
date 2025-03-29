import BaseView from "../../baseView";

class RaceBtn extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['race-button'],
      textContent: 'Race',
    });
  }
}
export default RaceBtn;
