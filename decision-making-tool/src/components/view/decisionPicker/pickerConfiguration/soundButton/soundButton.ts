import BaseView from '../../../baseView';
import soundOn from '../../../../../assets/img/sound-on.png';
import soundOff from '../../../../../assets/img/sound-off.png';
import sound from '../../../../utils/sound';
import Wheel from '../../wheel/wheel';

class SoundButton extends BaseView {
  private wheel: Wheel;
  private isMuted = true;
  private button: HTMLButtonElement | null = null;

  constructor(wheel: Wheel) {
    super({
      tag: 'button',
      classNames: ['sound-button'],
    });
    this.wheel = wheel;
    this.isMuted = JSON.parse(localStorage.getItem('isMuted') || 'true');
    const element = this.getBaseElement();
    if (element instanceof HTMLButtonElement) {
      this.button = element;
      this.button.style.backgroundImage = `url(${this.isMuted ? soundOff : soundOn})`;
      sound[this.isMuted ? 'muteSound' : 'unmuteSound']();
    }

    if (this.wheel) {
      this.wheel.addEventListener('spinStart', this.onSpinStart.bind(this));
      this.wheel.addEventListener('spinEnd', this.onSpinEnd.bind(this));
    }

    this.getBaseElement().addEventListener('click', () => {
      if (!this.wheel || !this.wheel.spinning) {
        if (this.button) {
          if (this.isMuted) {
            this.button.style.backgroundImage = `url(${soundOn})`;
            sound.unmuteSound();
            this.isMuted = false;
          } else {
            this.button.style.backgroundImage = `url(${soundOff})`;
            sound.muteSound();
            this.isMuted = true;
          }
        }
        localStorage.setItem('isMuted', JSON.stringify(this.isMuted));
      }
    });
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
export default SoundButton;
