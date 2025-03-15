import BaseView from '../../../baseView';

class SoundButton extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['sound-button'],
      textContent: 'sound off',
    });
    this.getBaseElement().addEventListener('click', () => {
      if (this.getBaseElement().textContent === 'sound off') {
        this.getBaseElement().textContent = 'sound on';
      } else {
        this.getBaseElement().textContent = 'sound off';
      }
    });
  }
}
export default SoundButton;
