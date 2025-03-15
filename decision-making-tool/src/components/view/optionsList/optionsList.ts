import BaseView from '../baseView';
import ButtonsConfigurationList from '../buttonsConfiguration/buttonsConfigurationList';
import Option from '../optionsList/option/option';
import '../optionsList/optionList.css';

class OptionsList extends BaseView {
  public options: Option[] = [];
  private optionIdCounter: number = 1;

  constructor() {
    super({ tag: 'div', classNames: ['options-list'] });
    const buttonsContainer = new ButtonsConfigurationList(this);
    const addButton = new BaseView({
      tag: 'button',
      classNames: ['add-option'],
      textContent: 'Add option',
      callback: () => this.addOption(),
    }).getBaseElement();
    this.append(addButton);
    this.addOption();
  }

  private addOption(): void {
    const newOption = new Option(this.optionIdCounter++, this.deleteOption.bind(this));
    this.options.push(newOption);
    this.append(newOption);
  }

  public deleteOption(option: Option): void {
    this.options = this.options.filter((opt) => opt !== option);
    option.removeElement();
    if (this.options.length === 0) {
      this.optionIdCounter = 1;
    }
  }

  public getOptions(): Option[] {
    return this.options;
  }

  public resetIdCounter() {
    if (this.options.length === 0) {
      this.optionIdCounter = 1;
    }
  }
  public setIdCounterAndLength(length: number, idCounter: number) {
    this.options.length = length;
    this.optionIdCounter = idCounter;
  }

  public getOptionsLength(): number {
    return this.options.length;
  }
}

export default OptionsList;
