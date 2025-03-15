import BaseView from '../baseView';
import DurationButton from './pickerConfiguration/durationButton/durationButton';
import PickerCinfiguration from './pickerConfiguration/pickerConfiguration';
import SoundButton from './pickerConfiguration/soundButton/soundButton';
import StartPicker from './pickerConfiguration/startButton/startPicker';

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
    this.appendChildren([pickerConfig, soundButton, time, start]);
  }
}

export default DecisionPickerView;
