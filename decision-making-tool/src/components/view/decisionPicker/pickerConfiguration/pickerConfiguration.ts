import BaseView from '../../baseView';
import PrevButton from './prevButton/prevButton';

class PickerCinfiguration extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['picker-configuration-container'],
    });
    const prevButton = new PrevButton();

    this.appendChildren([prevButton]);
  }
}
export default PickerCinfiguration;
