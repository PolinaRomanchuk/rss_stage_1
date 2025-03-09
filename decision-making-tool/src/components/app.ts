import Header from '../components/view/header/header-view';
import OptionsList from './view/optionsList/optionsList';

class App {
  constructor() {}

  renderApp(): void {
    const header = new Header();
    const optionsList = new OptionsList();

    document.body.append(header.getBaseElement(), optionsList.getBaseElement());
  }
}

export default App;
