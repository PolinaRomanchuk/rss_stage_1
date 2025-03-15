import BaseView from '../../../baseView';

class StartPicker extends BaseView {
  constructor() {
    super({
      tag: 'button',
      textContent: 'start',
      classNames: ['start-picker-button'],
    });
    this.getBaseElement().addEventListener('click', () => {});
  }
}
export default StartPicker;
