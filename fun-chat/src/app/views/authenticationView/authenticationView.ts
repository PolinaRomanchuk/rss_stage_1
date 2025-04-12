import BaseView from "../baseView";
import '../authenticationView/auth.css';
import InputView from "../../utils/inputView";
import router from "../../utils/router";
import { authUser, isLoginValid, isPasswordValid } from "../../services/authService";

class AuthenticationView extends BaseView {
  private contentContainer: BaseView;
  private loginView: InputView | null = null;
  private passwordView: InputView | null = null;

  private loginValidationSpan: BaseView | null = null;
  private passwordValidationSpan: BaseView | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['auth-container'] });
    this.contentContainer = this;
    this.renderContent();
  }

  private renderContent(): void {
    const window = this.renderAuthWindow();
    const header = this.renderHeader();
    const login = this.renderLoginContainer();
    const password = this.renderPasswordContainer();
    const loginButton = this.renderLogInButton();
    const info = this.renderInfo();
    window.appendChildren([header, login, password, loginButton, info]);
    this.contentContainer.appendChildren([window]);
  }

  private renderAuthWindow(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['auth-window'] });
  }
  private renderHeader(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['auth-header'], textContent: 'Fun Chat' });
  }

  private renderLoginContainer(): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['login-container'] });
    const span = this.renderLoginValidation();
    container.appendChildren([this.renderLoginInput(), span]);
    return container;
  }
  private renderLoginInput(): InputView {
    this.loginView = new InputView();
    this.loginView.addClass('login-input');
    this.loginView.setPlaceholder('Username');
    if (this.loginValidationSpan) {
      this.loginView.setValidSpan(this.loginValidationSpan);
      this.loginView.setValidFunction(isLoginValid);
    }
    return this.loginView;
  }

  private renderLoginValidation(): BaseView {
    this.loginValidationSpan = new BaseView({ tag: 'span', classNames: ['login-validation-span'] });
    return this.loginValidationSpan;
  }

  private renderPasswordContainer(): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['password-container'] });
    const span = this.renderPasswordValidation();
    container.appendChildren([this.renderPasswordInput(), span]);
    return container;
  }
  private renderPasswordInput(): InputView {
    this.passwordView = new InputView();
    this.passwordView.addClass('password-input');
    this.passwordView.setPlaceholder('Password');
    if (this.passwordValidationSpan) {
      this.passwordView.setValidSpan(this.passwordValidationSpan);
      this.passwordView.setValidFunction(isPasswordValid);
    }
    return this.passwordView;
  }

  private renderPasswordValidation(): BaseView {
    this.passwordValidationSpan = new BaseView({ tag: 'span', classNames: ['password-validation-span'] });
    return this.passwordValidationSpan;
  }

  private renderLogInButton(): BaseView {
    const button = new BaseView({ tag: 'button', classNames: ['login-button'], textContent: 'Log in' });
    button.getView().addEventListener('click', async () => {
      if (this.loginView && this.passwordView) {
        const username = this.loginView.getValue();
        const password = this.passwordView.getValue();
        if (this.passwordValidationSpan?.getView().textContent == '' && this.loginValidationSpan?.getView().textContent == '') {
          authUser(username, password);
        }
      }
    });
    return button;
  }

  private renderInfo(): BaseView {
    const link = new BaseView({ tag: 'a', classNames: ['info-link'], textContent: 'About us' });
    const view = link.getView();
    view.setAttribute('href', '#info');
    view.addEventListener('click', (event) => {
      event.preventDefault();
      router.navigate('info');
    });
    return link;
  }

}
export default AuthenticationView;