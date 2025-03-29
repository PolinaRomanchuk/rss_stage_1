import BaseView from '../baseView';
import router from '../../utils/router';

class ToWinnersBtn extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['to-winners-btn'],
      textContent: 'To winners',
    });
    const button = this.getView();
    button.addEventListener('click', () => {
      router.navigate('winners');
    });
  }
}
export default ToWinnersBtn;
