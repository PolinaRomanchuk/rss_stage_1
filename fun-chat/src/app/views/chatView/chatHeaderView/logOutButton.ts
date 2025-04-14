import { logoutUser } from "../../../services/authService";
import { getAuthUserLogin, getAuthUserPassword } from "../../../states/authState";
import BaseView from "../../baseView";

class LogOutButton extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['chat-logout-button'],
      textContent: 'Log out',
      callback: () => {
        this.logoutFunc();
      }
    });
  }

  private logoutFunc(): void {
    const userlogin = getAuthUserLogin();
    const userPassword = getAuthUserPassword();
    if (userlogin && userPassword) {
      logoutUser(userlogin, userPassword);
    }
  }
}

export default LogOutButton;