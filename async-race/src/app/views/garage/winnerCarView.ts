import BaseView from '../baseView';
import '../garage/garage.css';

class WinnerView extends BaseView {
  constructor(name: string) {
    super({
      tag: 'div',
      classNames: ['winner-text-container'],
    });

    const content = new BaseView({
      tag: 'div',
      classNames: ['winner-text-content'],
      textContent: `${name} is winner 🏆`,
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.removeView();
    });

    this.getView().addEventListener('click', (event) => {
      if (event.target === this.getView()) {
        this.removeView();
      }
    });

    this.append(content);
  }
}
export default WinnerView;
