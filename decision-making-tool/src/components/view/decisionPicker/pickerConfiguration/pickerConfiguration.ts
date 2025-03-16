import BaseView from '../../baseView';
import DurationButton from './durationButton/durationButton';
import PickOption from './pickOption/pickOption';
import PrevButton from './prevButton/prevButton';
import SoundButton from './soundButton/soundButton';
import StartPicker from './startButton/startPicker';
import '../pickerConfiguration/pickerConfiguration.css';
import Wheel from '../wheel/wheel';

class PickerCinfiguration extends BaseView {
  private wheel: Wheel;
  constructor(wheel: Wheel) {
    super({
      tag: 'div',
      classNames: ['picker-configuration-container'],
    });

    const configContainer = new BaseView({ tag: 'div', classNames: ['top-config-container'] });

    this.wheel = wheel;
    const prevButton = new PrevButton();
    const soundButton = new SoundButton();
    const time = new DurationButton();

    configContainer.appendChildren([prevButton, soundButton, time]);

    const start = new StartPicker(wheel, time);
    const pickOption = new PickOption();
    this.appendChildren([configContainer, pickOption, start]);
  }
}
export default PickerCinfiguration;
