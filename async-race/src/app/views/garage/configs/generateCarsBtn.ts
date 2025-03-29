import BaseView from "../../baseView";

class GenerateCarsBtn extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['generate-cars-button'],
      textContent: 'Generate cars',
    });
  }
}
export default GenerateCarsBtn;