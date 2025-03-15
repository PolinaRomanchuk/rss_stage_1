import BaseView from '../../baseView';
import DurationButton from './durationButton/durationButton';
import PickOption from './pickOption/pickOption';
import PrevButton from './prevButton/prevButton';
import SoundButton from './soundButton/soundButton';
import StartPicker from './startButton/startPicker';
import '../pickerConfiguration/pickerConfiguration.css';

class PickerCinfiguration extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['picker-configuration-container'],
    });
    const prevButton = new PrevButton();
    const soundButton = new SoundButton();
    const time = new DurationButton();
    const start = new StartPicker();
    const pickOption = new PickOption();
    this.appendChildren([prevButton, soundButton, time, pickOption, start]);
  }
}
export default PickerCinfiguration;
