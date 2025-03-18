import router from '../../../../utils/router';
import BaseView from '../../../baseView';
import backImg from '../../../../../assets/img/back.png';
import Wheel from '../../wheel/wheel';

class PrevButton extends BaseView {
  private wheel?: Wheel;
  private button: HTMLButtonElement | null = null;

  constructor(wheel?: Wheel) {
    super({
      tag: 'button',
      classNames: ['prev-button'],
    });
    this.wheel = wheel;

    const element = this.getBaseElement();
    if (this.wheel) {
      this.wheel.addEventListener('spinStart', this.onSpinStart.bind(this));
      this.wheel.addEventListener('spinEnd', this.onSpinEnd.bind(this));
    }

    if (element instanceof HTMLButtonElement) {
      this.button = element;
      this.button.style.backgroundImage = `url(${backImg})`;

      this.button.addEventListener('click', () => {
        if (!this.wheel || !this.wheel.spinning) {
          router.navigate('/');
        }
      });
    }
  }
  private onSpinStart() {
    if (this.button) {
      this.button.disabled = true;
    }
  }
  private onSpinEnd() {
    if (this.button) {
      this.button.disabled = false;
    }
  }
}
export default PrevButton;
