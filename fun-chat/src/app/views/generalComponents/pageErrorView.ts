import BaseView from '../baseView';
import BackButton from './backButton';

class ErrorView extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['error-container'],
    });

    const textError = new BaseView({
      tag: 'span',
      classNames: ['error-text'],
      textContent: 'Page not found',
    });

    const backButton = new BackButton();
    this.appendChildren([textError, backButton]);
  }
}
export default ErrorView;