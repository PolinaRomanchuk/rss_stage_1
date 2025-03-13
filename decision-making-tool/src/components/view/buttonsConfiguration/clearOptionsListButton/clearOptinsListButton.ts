import BaseView from '../../baseView';
import OptionsList from '../../optionsList/optionsList';

class ClearOptionsListButton extends BaseView {
  constructor(optionsList: OptionsList) {
    super({
      tag: 'button',
      classNames: ['clear-options-button'],
      textContent: 'Clear list',
    });
    this.getBaseElement().addEventListener('click', () => {
      const options = optionsList.getOptions();
      options.forEach((option) => option.removeElement());
      options.length = 0;
      optionsList.resetIdCounter();
    });
  }
}
export default ClearOptionsListButton;
