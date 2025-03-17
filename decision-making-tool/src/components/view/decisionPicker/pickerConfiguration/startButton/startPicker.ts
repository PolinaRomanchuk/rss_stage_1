import BaseView from '../../../baseView';
import Wheel from '../../wheel/wheel';
import DurationButton from '../durationButton/durationButton';

class StartPicker extends BaseView {
  private wheel: Wheel;
  constructor(wheel: Wheel, time: DurationButton) {
    super({
      tag: 'button',
      textContent: 'start',
      classNames: ['start-picker-button'],
    });
    this.wheel = wheel;
    this.getBaseElement().addEventListener('click', () => {
      const timeValue = time.getValue();

      if (timeValue >= 5 && timeValue <= 30) {
        wheel.turn(timeValue);
      }
      return;
    });
  }
}
export default StartPicker;
