import BaseView from "../baseView";
import router from "../../utils/router";

class BackButton extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['back-button'],
      textContent: 'Back',
      callback: () => this.back()
    })
  }
  private back(): void {
    router.navigate('login');
  }
}
export default BackButton;

