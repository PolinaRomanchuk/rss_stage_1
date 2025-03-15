import BaseView from '../baseView';
import DurationButton from './pickerConfiguration/durationButton/durationButton';
import PickerCinfiguration from './pickerConfiguration/pickerConfiguration';
import PickOption from './pickerConfiguration/pickOption/pickOption';
import SoundButton from './pickerConfiguration/soundButton/soundButton';
import StartPicker from './pickerConfiguration/startButton/startPicker';
import Wheel from './wheel/wheel';

class DecisionPickerView extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['decision-picker-container'],
    });
    const pickerConfig = new PickerCinfiguration();
    const soundButton = new SoundButton();
    const time = new DurationButton();
    const start = new StartPicker();
    const pickOption = new PickOption();
    const wheel = new Wheel();
    this.appendChildren([pickerConfig, soundButton, time, start, pickOption, wheel]);
  }
}

export default DecisionPickerView;
