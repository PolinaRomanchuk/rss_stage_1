import router from '../../../../utils/router';
import BaseView from '../../../baseView';

class PrevButton extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['prev-button'],
      textContent: 'Prev',
    });
    this.getBaseElement().addEventListener('click', () => {
      router.navigate('/');
    });
  }
}
export default PrevButton;
