import BaseView from "../baseView";
import '../authenticationView/auth.css';
import InputView from "../../utils/inputView";
import router from "../../utils/router";
import { loginUser, checkLoginValid, checkPasswordValid } from "../../services/authService";
import { isAuthenticated } from "../../states/authState";

class AuthenticationView extends BaseView {
  private contentContainer: BaseView;
  private loginView: InputView | null = null;
  private passwordView: InputView | null = null;

  private loginValidationSpan: BaseView | null = null;
  private passwordValidationSpan: BaseView | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['auth-container'] });
    this.contentContainer = this;
    if (isAuthenticated()) {
      this.removeEnterEventListener();
      router.navigate('chat');
      return;
    }
    this.renderContent();
  }

  private renderContent(): void {
    const content = this.renderAuthContent();
    const header = this.renderHeader();
    const login = this.renderLoginContainer();
    const password = this.renderPasswordContainer();
    const loginButton = this.renderLogInButton();
    const info = this.renderInfo();
    content.appendChildren([header, login, password, loginButton, info]);
    this.contentContainer.appendChildren([content]);
  }

  private renderAuthContent(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['auth-content'] });
  }

  private renderHeader(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['auth-header'], textContent: 'Fun Chat' });
  }

  private renderLoginContainer(): BaseView {
    return this.renderInputWithSpanValidationContainer(
      'login',
      'Username',
      checkLoginValid,
      (input) => this.loginView = input,
      (span) => this.loginValidationSpan = span);
  }

  private renderPasswordContainer(): BaseView {
    return this.renderInputWithSpanValidationContainer(
      'password',
      'Password',
      checkPasswordValid,
      (input) => this.passwordView = input,
      (span) => this.passwordValidationSpan = span);
  }

  private renderLogInButton(): BaseView {
    const button = new BaseView({ tag: 'button', classNames: ['login-button'], textContent: 'Log in' });
    button.getView().addEventListener('click', async () => {
      this.handleLogInButton();
    });

    document.addEventListener('keydown', this.enterKeyHandler);
    return button;
  }

  private enterKeyHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.handleLogInButton();
    }
  };

  public removeEnterEventListener(): void {
    document.removeEventListener('keydown', this.enterKeyHandler);
  }

  private handleLogInButton(): void {
    if (!this.loginView || !this.passwordView) return;

    const username = this.loginView.getValue();
    const password = this.passwordView.getValue();
    const loginValidationText = this.loginValidationSpan?.getView().textContent;
    const passwordValidationText = this.passwordValidationSpan?.getView().textContent;

    if (loginValidationText == ' ' && passwordValidationText == ' ' && this.loginValidationSpan && this.passwordValidationSpan) {
      this.loginValidationSpan.getView().textContent = 'enter at least 4 characters with one capital letter';
      this.passwordValidationSpan.getView().textContent = 'enter at least 4 characters';
    }

    if (loginValidationText == '' && passwordValidationText == '') {
      loginUser(username, password);
      this.removeEnterEventListener();
    }

  }

  private renderInfo(): BaseView {
    const link = new BaseView({ tag: 'a', classNames: ['info-link'], textContent: 'About us' });
    const view = link.getView();
    view.setAttribute('href', '#info');
    view.addEventListener('click', (event) => {
      event.preventDefault();
      this.removeEnterEventListener();
      router.navigate('info');
    });
    return link;
  }

  private renderInputWithSpanValidationContainer(
    inputClassName: string,
    placeholder: string,
    validFunc: (value: string) => string,
    setInputRef: (input: InputView) => void,
    setSpanRef: (span: BaseView) => void): BaseView {

    const container = new BaseView({ tag: 'div', classNames: [`${inputClassName}-container`] });
    const span = new BaseView({ tag: 'span', classNames: [`${inputClassName}-validation-span`], textContent: ' ' });
    setSpanRef(span);

    const input = new InputView();
    input.addClass(`${inputClassName}-input`);
    input.setPlaceholder(placeholder);
    if (inputClassName === 'password') {
      input.setType('password');
    } else {
      input.setType('text');
    }

    input.setValidSpan(span);
    input.setValidFunction(validFunc);
    setInputRef(input);

    container.appendChildren([input, span]);
    return container;
  }
}
export default AuthenticationView;