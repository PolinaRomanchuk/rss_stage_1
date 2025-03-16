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
    const options = this.loadOptions();

    const wheel = new Wheel(options);

    this.appendChildren([pickerConfig, wheel]);
  }
  private loadOptions(): { name: string; weight: number }[] {
    const data = sessionStorage.getItem('options');
    try {
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error', e);
      return [];
    }
  }
}

export default DecisionPickerView;
