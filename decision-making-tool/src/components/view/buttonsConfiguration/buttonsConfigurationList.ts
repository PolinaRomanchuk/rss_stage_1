import BaseView from '../baseView';
import ClearOptionsListButton from './clearOptionsListButton/clearOptinsListButton';
import OptionsList from '../optionsList/optionsList';

class ButtonsConfigurationList extends BaseView {
  constructor(optionsList: OptionsList) {
    super({
      tag: 'div',
      classNames: ['buttons-configuration-container'],
    });
    const clearOptionsButton = new ClearOptionsListButton(optionsList);
    this.append(clearOptionsButton);
  }
}
export default ButtonsConfigurationList;
