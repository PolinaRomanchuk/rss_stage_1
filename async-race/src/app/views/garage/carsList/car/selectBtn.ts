import BaseView from '../../../baseView';
import CarView from './carView';

class SelectBtn extends BaseView {
  constructor(car: CarView, onSelect: (car: CarView) => void) {
    super({
      tag: 'button',
      classNames: ['select-button'],
      textContent: 'Select',
      callback: () => onSelect(car),
    });
  }
}
export default SelectBtn;
