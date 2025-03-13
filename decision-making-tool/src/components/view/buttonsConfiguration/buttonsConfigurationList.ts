import BaseView from '../baseView';
import ClearOptionsListButton from './clearOptionsListButton/clearOptinsListButton';
import OptionsList from '../optionsList/optionsList';
import SaveOptionsToJsonButton from './saveOptionsToJsonButton/saveOptionsToJsonButton';

class ButtonsConfigurationList extends BaseView {
  constructor(optionsList: OptionsList) {
    super({
      tag: 'div',
      classNames: ['buttons-configuration-container'],
    });
    const clearOptionsButton = new ClearOptionsListButton(optionsList);
    const saveButton = new SaveOptionsToJsonButton(optionsList);
    this.appendChildren([clearOptionsButton, saveButton]);
  }
}
export default ButtonsConfigurationList;
