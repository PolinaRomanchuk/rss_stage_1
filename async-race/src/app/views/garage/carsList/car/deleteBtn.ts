import BaseView from '../../../baseView';
import CarView from './carView';

class DeleteBtn extends BaseView {
  constructor(car: CarView, onDelete: (car: CarView) => void) {
    super({
      tag: 'button',
      classNames: ['delete-button'],
      textContent: 'Delete',
      callback: () => onDelete(car),
    }, true);
  }
}
export default DeleteBtn;
