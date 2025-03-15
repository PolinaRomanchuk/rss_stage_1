import ModalWindow from '../../../../utils/modalWindow/modalWindow';
import BaseView from '../../../baseView';
import OptionsList from '../../optionsList/optionsList';

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
      }
    });
  }

  private checkValid(): boolean {
    const length = this.optionsList.getOptionsLength();
    if (length < 2) {
      this.openModal();
      return true;
    }
    return false;
  }

  private openModal(): void {
    const modal = new ModalWindow();
    const info = new BaseView({
      tag: 'div',
      classNames: ['info'],
      textContent: 'Please add at least 2 valid options.',
    }).getBaseElement();
    const modalContent = new BaseView({ tag: 'div', classNames: ['modal-window-info-content'] });
    modalContent.appendChildren([info]);

    modal.setContent(modalContent.getBaseElement());
    modal.open();
  }
}
export default StartButton;
