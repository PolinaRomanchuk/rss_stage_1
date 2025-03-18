import BaseView from '../../../baseView';
import Wheel from '../../wheel/wheel';
import DurationButton from '../durationButton/durationButton';

class StartPicker extends BaseView {
  private wheel: Wheel;
  private button: HTMLButtonElement | null = null;

  constructor(wheel: Wheel, time: DurationButton) {
    super({
      tag: 'button',
      textContent: 'start',
      classNames: ['start-picker-button'],
    });

    const element = this.getBaseElement();

    if (element instanceof HTMLButtonElement) {
      this.button = element;
    }

    this.wheel = wheel;
    if (this.wheel) {
      this.wheel.addEventListener('spinStart', this.onSpinStart.bind(this));
      this.wheel.addEventListener('spinEnd', this.onSpinEnd.bind(this));
    }

    this.getBaseElement().addEventListener('click', () => {
      const timeValue = time.getValue();
      time.validate();
      if (time.checkValid()) {
        wheel.turn(timeValue);
      } else {
        return;
      }
    });
  }

  private onSpinStart() {
    if (this.button) {
      this.button.disabled = true;
    }
  }
  private onSpinEnd() {
    if (this.button) {
      this.button.disabled = false;
    }
  }
}
export default StartPicker;
