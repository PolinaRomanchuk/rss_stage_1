import BaseView from '../../../baseView';
import OptionsList from '../../optionsList/optionsList';

class SaveOptionsToJsonButton extends BaseView {
  constructor(optionsList: OptionsList) {
    super({
      tag: 'button',
      classNames: ['save-options-in-json-button'],
      textContent: 'Save list to json',
    });
    this.getBaseElement().addEventListener('click', () => {
      const options = optionsList.getOptions().map((option) => option.getData());
      const json = JSON.stringify(options, null, 2);
      this.download(json);
    });
  }

  private download(json: string) {
    const dataUri = 'data:text/json;charset=utf8,' + encodeURIComponent(json);
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = 'options.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
export default SaveOptionsToJsonButton;
