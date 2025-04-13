import BaseView from "../baseView";
import '../authenticationView/auth.css';

class AuthError extends BaseView {
  constructor(error: string) {
    super({ tag: 'div', classNames: ['auth-error-container'] });
    const content = new BaseView({ tag: 'div', classNames: ['auth-error-content'] });
    const text = new BaseView({ tag: 'div', classNames: ['auth-error-text'], textContent: error });
    content.append(text);
    this.append(content);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.removeView();
    });

    this.getView().addEventListener('click', (event) => {
      if (event.target === this.getView()) {
        this.removeView();
      }
    });
  }
}
export default AuthError;