import BaseView from '../../../baseView';
import timeIcon from '../../../../../assets/img/time.png';

class DurationButton extends BaseView {
  private inputTime: HTMLInputElement;
  constructor() {
    super({
      tag: 'div',
      classNames: ['duration-container'],
    });

    const icon = new BaseView({ tag: 'div', classNames: ['icon-duration'] });

    icon.getBaseElement().style.backgroundImage = `url(${timeIcon})`;
    this.inputTime = document.createElement('input');
    this.inputTime.type = 'number';
    this.inputTime.classList.add('time-input');

    this.inputTime.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement) || !this.inputTime) return;
      this.inputTime.value = target.value;
      this.validate();
    });

    this.appendChildren([icon, this.inputTime]);
  }

  public getValue(): number {
    return Number(this.inputTime.value);
  }

  private validate(): void {
    this.checkValid() ? this.inputTime.classList.remove('invalid') : this.inputTime.classList.add('invalid');
  }

  public checkValid(): boolean {
    const value = this.getValue();
    return value >= 5 && value <= 30;
  }
}

export default DurationButton;
