import Header from '../components/view/header/header-view';
import ButtonsConfigurationList from './view/buttonsConfiguration/buttonsConfigurationList';
import OptionsList from './view/optionsList/optionsList';

class App {
  constructor() {}

  renderApp(): void {
    const header = new Header();
    const optionsList = new OptionsList();
    const buttons = new ButtonsConfigurationList(optionsList);

    document.body.append(header.getBaseElement(), optionsList.getBaseElement(), buttons.getBaseElement());
  }
}

export default App;
