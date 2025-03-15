import Header from '../components/view/header/header-view';
import OptionsCreatorView from './view/optionCreater/optionsCreatorView';

class App {
  constructor() {}

  renderApp(): void {
    const header = new Header();
    const optionsCreator = new OptionsCreatorView();

    document.body.append(header.getBaseElement(), optionsCreator.getBaseElement());
  }
}

export default App;
