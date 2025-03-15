import BaseView from '../baseView';
import ButtonsConfigurationList from './buttonsConfiguration/buttonsConfigurationList';
import OptionsList from './optionsList/optionsList';
import '../optionCreater/optionsCreator.css'

class OptionsCreatorView extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['options-creator-container'],
    });
    const optionsList = new OptionsList();
    const buttons = new ButtonsConfigurationList(optionsList);
    this.appendChildren([optionsList, buttons]);
  }
}
export default OptionsCreatorView;
