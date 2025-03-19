import BaseView from '../../../baseView';
import timeIcon from '../../../../../assets/img/time.png';
import Wheel from '../../wheel/wheel';

class DurationButton extends BaseView {
  private inputTime: HTMLInputElement;
  private wheel: Wheel;
  constructor(wheel: Wheel) {
    super({
      tag: 'div',
      classNames: ['duration-container'],
    });
    this.wheel = wheel;
    const icon = new BaseView({ tag: 'div', classNames: ['icon-duration'] });

    icon.getBaseElement().style.backgroundImage = `url(${timeIcon})`;
    this.inputTime = document.createElement('input');
    this.inputTime.type = 'number';
    this.inputTime.classList.add('time-input');
    this.inputTime.value = '6';

    this.wheel.addEventListener('spinStart', this.onSpinStart.bind(this));
    this.wheel.addEventListener('spinEnd', this.onSpinEnd.bind(this));

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

  public validate(): void {
    this.checkValid() ? this.inputTime.classList.remove('invalid') : this.inputTime.classList.add('invalid');
  }

  public checkValid(): boolean {
    const value = this.getValue();
    return value >= 5 && value <= 30;
  }

  private onSpinStart() {
    this.inputTime.disabled = true;
  }
  private onSpinEnd() {
    this.inputTime.disabled = false;
  }
}

export default DurationButton;
