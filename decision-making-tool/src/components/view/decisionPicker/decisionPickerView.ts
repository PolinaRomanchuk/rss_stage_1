import BaseView from '../baseView';
import PickerCinfiguration from './pickerConfiguration/pickerConfiguration';

class DecisionPickerView extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['decision-picker-container'],
    });
    const pickerConfig = new PickerCinfiguration();
    this.appendChildren([pickerConfig]);
  }
}

export default DecisionPickerView;
