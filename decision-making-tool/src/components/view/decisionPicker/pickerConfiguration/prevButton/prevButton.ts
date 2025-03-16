import router from '../../../../utils/router';
import BaseView from '../../../baseView';
import backImg from '../../../../../assets/img/back.png';

class PrevButton extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['prev-button'],
    });
    this.getBaseElement().style.backgroundImage = `url(${backImg})`;
    this.getBaseElement().addEventListener('click', () => {
      router.navigate('/');
    });
  }
}
export default PrevButton;
