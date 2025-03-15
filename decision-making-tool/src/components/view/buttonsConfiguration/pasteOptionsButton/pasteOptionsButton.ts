import ModalWindow from '../../../utils/modalWindow/modalWindow';
import BaseView from '../../baseView';
import OptionsList from '../../optionsList/optionsList';
import '../pasteOptionsButton/paste.css';

class PasteOptionsButton extends BaseView {
  constructor(optionsList: OptionsList) {
    super({
      tag: 'button',
      classNames: ['past-options-button'],
      textContent: 'Paste list',
    });
    this.getBaseElement().addEventListener('click', () => this.openModal());
  }

  private openModal(): void {
    const modal = new ModalWindow();

    const textArea = new BaseView({
      tag: 'textarea',
      classNames: ['paste-textarea'],
      textContent: '',
    }).getBaseElement();

    const pasteButton = new BaseView({
      tag: 'button',
      classNames: ['paste-confirm'],
      textContent: 'Load',
      callback: () => {
        this.pasteOptions();
        modal.close();
      },
    }).getBaseElement();

    const modalContent = new BaseView({ tag: 'div', classNames: ['modal-window-content'] });
    modalContent.appendChildren([textArea, pasteButton]);

    modal.setContent(modalContent.getBaseElement());
    modal.open();
  }
  private pasteOptions() {}
}
export default PasteOptionsButton;
