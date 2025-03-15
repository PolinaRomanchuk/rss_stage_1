import BaseView from '../baseView';
import ClearOptionsListButton from './clearOptionsListButton/clearOptinsListButton';
import OptionsList from '../optionsList/optionsList';
import SaveOptionsToJsonButton from './saveOptionsToJsonButton/saveOptionsToJsonButton';
import LoadOptionsButton from './loadOptionsButton/loadOptionsButton';
import PasteOptionsButton from './pasteOptionsButton/pasteOptionsButton';

class ButtonsConfigurationList extends BaseView {
  constructor(optionsList: OptionsList) {
    super({
      tag: 'div',
      classNames: ['buttons-configuration-container'],
    });
    const clearOptionsButton = new ClearOptionsListButton(optionsList);
    const saveButton = new SaveOptionsToJsonButton(optionsList);
    const loadButton = new LoadOptionsButton(optionsList);
    const pastButton = new PasteOptionsButton(optionsList);
    this.appendChildren([clearOptionsButton, saveButton, loadButton, pastButton]);
  }
}
export default ButtonsConfigurationList;
