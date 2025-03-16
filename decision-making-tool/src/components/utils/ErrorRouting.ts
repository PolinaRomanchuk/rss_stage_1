import BaseView from '../view/baseView';
import PrevButton from '../view/decisionPicker/pickerConfiguration/prevButton/prevButton';
import '../utils/error.css';

class ErrorRouting extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['error-container'],
    });

    const textError = new BaseView({ tag: 'span', classNames: ['error-text'], textContent: 'Page not found' });
    const backButton = new PrevButton();
    this.appendChildren([textError, backButton]);
  }
}
export default ErrorRouting;
