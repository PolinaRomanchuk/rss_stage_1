import ModalWindow from '../../../../utils/modalWindow/modalWindow';
import BaseView from '../../../baseView';
import OptionsList from '../../optionsList/optionsList';
import router from '../../../../utils/router';
import '../startButton/start.css';

class StartButton extends BaseView {
  private optionsList: OptionsList;
  constructor(optionsList: OptionsList) {
    super({
      tag: 'button',
      classNames: ['start-button'],
      textContent: 'Start',
    });
    this.optionsList = optionsList;
    this.getBaseElement().addEventListener('click', () => {
      if (this.checkValid()) {
        const options = optionsList
          .getOptions()
          .filter((opt) => {
            const data = opt.getData();
            return data.weight > 0 && data.name.length !== 0;
          })
          .map((opt) => opt.getData());

        sessionStorage.setItem('options', JSON.stringify(options));
        console.log(options);
        router.navigate('/decision-picker');
      }
    });
  }

  private checkValid(): boolean {
    const length = this.optionsList.getOptionsLength();
    const options = this.optionsList.getOptions();
    if (length) {
      let counter = 0;
      for (let i = 0; i < options.length; i++) {
        const data = options[i].getData();
        if (data.weight > 0 && data.name.length !== 0) {
          counter++;
        }
      }
      if (counter >= 2 && length >= 2) {
        return true;
      }
    }
    this.openModal();
    return false;
  }

  private openModal(): void {
    const modal = new ModalWindow();
    const info = new BaseView({
      tag: 'div',
      classNames: ['valid-info'],
      textContent: 'Please add at least 2 valid options.',
    }).getBaseElement();
    const modalContent = new BaseView({ tag: 'div', classNames: ['modal-window-info-content'] });
    modalContent.appendChildren([info]);

    modal.setContent(modalContent.getBaseElement());
    modal.open();
  }
}
export default StartButton;
