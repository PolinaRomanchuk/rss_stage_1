import BaseView from '../../baseView';
import ButtonsConfigurationList from '../buttonsConfiguration/buttonsConfigurationList';
import Option from './option/option';
import '../optionsList/options.css';

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
    const savedOptions = localStorage.getItem('options');
    if (savedOptions) {
      const { options, idCounter } = JSON.parse(savedOptions);
      this.optionIdCounter = idCounter;
      if (options.length > 0) {
        this.setOptions(options);
      } else {
        this.addOption();
      }
    } else {
      this.addOption();
    }
  }

  private addOption(): void {
    const newOption = new Option(this.optionIdCounter++, this.deleteOption.bind(this));
    this.options.push(newOption);
    this.append(newOption);
    this.saveOptions();
  }

  public deleteOption(option: Option): void {
    this.options = this.options.filter((opt) => opt !== option);
    option.removeElement();
    if (this.options.length === 0) {
      this.optionIdCounter = 1;
    }
    this.saveOptions();
  }

  public saveOptions() {
    const optionsData = {
      options: this.options.map((option) => option.getData()),
      idCounter: this.optionIdCounter,
    };
    localStorage.setItem('options', JSON.stringify(optionsData));
  }

  private setOptions(optionsData: { id: number; name: string; weight: number }[]) {
    optionsData.forEach((optionData) => {
      const option = new Option(optionData.id, this.deleteOption.bind(this), optionData);
      this.options.push(option);
      this.append(option);
    });
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
