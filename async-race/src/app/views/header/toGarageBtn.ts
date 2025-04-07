import BaseView from '../baseView';
import router from '../../utils/router';

class ToGarageBtn extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['to-garage-btn'],
      textContent: 'To garage',
    }, true);
    const button = this.getView();
    button.addEventListener('click', () => {
      router.navigate('');
    });
  }
}
export default ToGarageBtn;
