import BaseView from '../../../baseView';
import OptionsList from '../../optionsList/optionsList';
import Option from '../../optionsList/option/option';

class LoadOptionsButton extends BaseView {
  private optionsList: OptionsList;

  constructor(optionsList: OptionsList) {
    super({
      tag: 'button',
      classNames: ['load-options-button'],
      textContent: 'Load list from json',
    });
    this.optionsList = optionsList;
    this.initEventListener();
  }

  private initEventListener(): void {
    this.getBaseElement().addEventListener('click', () => this.createFileInputAndSetEventListener());
  }

  private createFileInputAndSetEventListener(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.addEventListener('change', (event) => this.handleFile(event));
    input.click();
  }

  private handleFile(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;

    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.parseFileContent(reader.result);
    reader.readAsText(file);
  }

  private parseFileContent(result: string | ArrayBuffer | null): void {
    if (typeof result !== 'string') {
      console.error('Invalid file format');
      return;
    }
    try {
      const data: { id: number; name: string; weight: number }[] = JSON.parse(result);
      this.loadOptions(data);
    } catch (error) {
      console.error('Error parsing', error);
    }
  }

  private loadOptions(data: { id: number; name: string; weight: number }[]): void {
    this.optionsList.removeAllChildren();

    const lastId = Math.max(...data.map((item) => item.id), 0);
    this.optionsList.setIdCounterAndLength(data.length, lastId + 1);

    data.forEach((item) => this.addOptionToList(item));
  }

  private addOptionToList(item: { id: number; name: string; weight: number }): void {
    const newOption = new Option(item.id, this.optionsList.deleteOption.bind(this.optionsList));
    newOption.setTitle(item.name);
    newOption.setWeight(item.weight);

    this.optionsList.append(newOption);
    this.optionsList.options.push(newOption);
  }
}
export default LoadOptionsButton;
