import BaseView from '../../../baseView';
import timeIcon from '../../../../../assets/img/time.png'

class DurationButton extends BaseView {
  private input: string | null = null;
  constructor() {
    super({
      tag: 'div',
      classNames: ['duration-container'],
    });

    const icon = new BaseView({ tag: 'div', classNames: ['icon-duration']});

    icon.getBaseElement().style.backgroundImage =`url(${timeIcon})`;
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
