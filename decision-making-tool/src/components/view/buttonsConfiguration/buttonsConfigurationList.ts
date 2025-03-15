import BaseView from '../baseView';
import ClearOptionsListButton from './clearOptionsListButton/clearOptinsListButton';
import OptionsList from '../optionsList/optionsList';
import SaveOptionsToJsonButton from './saveOptionsToJsonButton/saveOptionsToJsonButton';
import LoadOptionsButton from './loadOptionsButton/loadOptionsButton';
import PasteOptionsButton from './pasteOptionsButton/pasteOptionsButton';
import StartButton from './startButton/startButton';


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
    const start = new StartButton(optionsList);
    this.appendChildren([clearOptionsButton, saveButton, loadButton, pastButton, start]);
  }
}
export default ButtonsConfigurationList;
