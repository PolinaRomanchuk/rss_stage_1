import BaseView from "../baseView";
import '../authenticationView/auth.css';
import InputView from "../../utils/inputView";
import router from "../../utils/router";

class AuthenticationView extends BaseView {
  private contentContainer: BaseView;

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
    container.appendChildren([this.renderLoginInput(), this.renderLoginValidation()])
    return container;
  }
  private renderLoginInput(): InputView {
    const login = new InputView();
    login.addClass('login-input');
    login.setPlaceholder('Username');
    return login;
  }

  private renderLoginValidation(): BaseView {
    return new BaseView({ tag: 'span', classNames: ['login-validation-span'], textContent: 'test' });
  }

  private renderPasswordContainer(): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['password-container'] });
    container.appendChildren([this.renderPasswordInput(), this.renderPasswordValidation()]);
    return container;
  }
  private renderPasswordInput(): InputView {
    const password = new InputView();
    password.addClass('password-input');
    password.setPlaceholder('Password');
    return password;
  }

  private renderPasswordValidation(): BaseView {
    return new BaseView({ tag: 'span', classNames: ['password-validation-span'], textContent: 'test' });
  }

  private renderLogInButton(): BaseView {
    const button = new BaseView({ tag: 'button', classNames: ['login-button'], textContent: 'Log in' });
    button.getView().addEventListener('click', () => {
      router.navigate('chat');
    })
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