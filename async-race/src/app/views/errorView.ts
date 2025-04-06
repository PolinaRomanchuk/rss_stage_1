import BaseView from './baseView';

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

    this.append(textError);
  }
}
export default ErrorView;
