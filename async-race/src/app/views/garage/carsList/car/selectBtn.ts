import BaseView from "../../../baseView";

class SelectBtn extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['select-button'],
      textContent: 'Select',
    });
  }
}
export default SelectBtn;