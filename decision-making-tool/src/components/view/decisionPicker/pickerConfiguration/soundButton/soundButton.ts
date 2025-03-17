import BaseView from '../../../baseView';
import soundOn from '../../../../../assets/img/sound-on.png';
import soundOff from '../../../../../assets/img/sound-off.png';
import sound from '../../../../utils/sound';

class SoundButton extends BaseView {
  private isMuted = true;

  constructor() {
    super({
      tag: 'button',
      classNames: ['sound-button'],
    });
    this.isMuted = JSON.parse(localStorage.getItem('isMuted') || 'true');
    const button = this.getBaseElement();
    button.style.backgroundImage = `url(${this.isMuted ? soundOff : soundOn})`;
    sound[this.isMuted ? 'muteSound' : 'unmuteSound']();

    this.getBaseElement().addEventListener('click', () => {
      if (this.isMuted) {
        button.style.backgroundImage = `url(${soundOn})`;
        sound.unmuteSound();
        this.isMuted = false;
      } else {
        button.style.backgroundImage = `url(${soundOff})`;
        sound.muteSound();
        this.isMuted = true;
      }
      localStorage.setItem('isMuted', JSON.stringify(this.isMuted));
    });
  }
}
export default SoundButton;
