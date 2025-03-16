import BaseView from '../../../baseView';

class DurationButton extends BaseView {
  private input: string | null = null;
  constructor() {
    super({
      tag: 'div',
      classNames: ['duration-container'],
    });

    const icon = new BaseView({ tag: 'div', classNames: ['infoDuration'], textContent: 'Time:' });
    const inputTime = new BaseView({ tag: 'input', classNames: ['time-input'] });

    inputTime.getBaseElement().addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;

      this.input = target.value;
    });

    this.appendChildren([icon, inputTime]);
  }

  public getValue() {
    return this.input;
  }
}

export default DurationButton;
