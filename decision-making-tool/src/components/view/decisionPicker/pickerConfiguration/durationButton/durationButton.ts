import BaseView from '../../../baseView';

class DurationButton extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['duration-container'],
    });

    const icon = new BaseView({ tag: 'div', classNames: ['infoDuration'], textContent: 'Time:' });
    const inputTime = new BaseView({ tag: 'input', classNames: ['time-input'] });
    this.appendChildren([icon, inputTime]);
  }
}

export default DurationButton;
