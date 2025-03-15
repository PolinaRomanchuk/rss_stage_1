import BaseView from '../baseView';
import PickerCinfiguration from './pickerConfiguration/pickerConfiguration';
import Wheel from './wheel/wheel';

class DecisionPickerView extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['decision-picker-container'],
    });
    const pickerConfig = new PickerCinfiguration();
    const wheel = new Wheel();


    this.appendChildren([pickerConfig, wheel]);
  }
}

export default DecisionPickerView;
