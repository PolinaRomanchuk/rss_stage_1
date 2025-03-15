import ModalWindow from '../../../utils/modalWindow/modalWindow';
import BaseView from '../../baseView';
import OptionsList from '../../optionsList/optionsList';
import '../pasteOptionsButton/paste.css';
import Option from '../../optionsList/option/option';

class PasteOptionsButton extends BaseView {
  private textArea: HTMLElement | null = null;
  private optionsList: OptionsList;

  constructor(optionsList: OptionsList) {
    super({
      tag: 'button',
      classNames: ['past-options-button'],
      textContent: 'Paste list',
    });
    this.optionsList = optionsList;
    this.getBaseElement().addEventListener('click', () => this.openModal());
  }

  private openModal(): void {
    const modal = new ModalWindow();

    const textArea = new BaseView({
      tag: 'textarea',
      classNames: ['paste-textarea'],
      textContent: '',
    }).getBaseElement();
    textArea.setAttribute('placeholder', 'enter in the format: \ntest, 10\ntest, 11');
    this.textArea = textArea;

    const pasteButton = new BaseView({
      tag: 'button',
      classNames: ['paste-confirm'],
      textContent: 'Paste',
      callback: () => {
        this.pasteOptions();
        modal.close();
      },
    }).getBaseElement();

    const modalContent = new BaseView({ tag: 'div', classNames: ['modal-window-content'] });
    modalContent.appendChildren([this.textArea, pasteButton]);

    modal.setContent(modalContent.getBaseElement());
    modal.open();
  }

  private pasteOptions(): void {
    const data = this.parseTextData();
    if (data) {
      data.forEach((item) => this.addOptionToList(item));
      this.updateId();
    }
  }

  private parseTextData(): { name: string; weight: number }[] {
    if (!(this.textArea instanceof HTMLTextAreaElement)) return [];
    const text = this.textArea.value.trim();
    const lines = text.split('\n');
    const data: { name: string; weight: number }[] = [];

    for (const line of lines) {
      const parts = line.split(',').map((part) => part.trim());
      const name = parts[0];
      const weight = Number(parts[1]);
      data.push({ name, weight });
    }
    return data;
  }

  private addOptionToList(item: { name: string; weight: number }): void {
    const lastId = this.getLastOptionId();
    const newOption = new Option(lastId + 1, this.optionsList.deleteOption.bind(this.optionsList));
    newOption.setTitle(item.name);
    newOption.setWeight(item.weight);

    this.optionsList.append(newOption);
    this.optionsList.options.push(newOption);
  }

  private updateId() {
    const length = this.optionsList.getOptionsLength();
    const lastId = this.getLastOptionId();
    this.optionsList.setIdCounterAndLength(length, lastId + 1);
  }

  private getLastOptionId(): number {
    const options = this.optionsList.getOptions();
    if (options.length === 0) return 0;
    return Math.max(...options.map((option) => option.getIdNumber()));
  }
}
export default PasteOptionsButton;
