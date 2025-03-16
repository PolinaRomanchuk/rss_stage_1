import BaseView from '../../../baseView';
import soundOn from '../../../../../assets/img/sound-on.png';
import soundOff from '../../../../../assets/img/sound-off.png';

class SoundButton extends BaseView {
  private isSoundOn = false;

  constructor() {
    super({
      tag: 'button',
      classNames: ['sound-button'],
    });
    const button = this.getBaseElement();
    button.style.backgroundImage = `url(${soundOff})`;

    this.getBaseElement().addEventListener('click', () => {
      this.isSoundOn = !this.isSoundOn;
      button.style.backgroundImage = this.isSoundOn ? `url(${soundOn})` : `url(${soundOff})`;
    });
  }
}
export default SoundButton;
