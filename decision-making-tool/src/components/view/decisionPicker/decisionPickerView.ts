import BaseView from '../baseView';
import PickerCinfiguration from './pickerConfiguration/pickerConfiguration';
import SoundButton from './pickerConfiguration/soundButton/soundButton';

class DecisionPickerView extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['decision-picker-container'],
    });
    const pickerConfig = new PickerCinfiguration();
    const soundButton = new SoundButton();
    this.appendChildren([pickerConfig, soundButton]);
  }
}

export default DecisionPickerView;
