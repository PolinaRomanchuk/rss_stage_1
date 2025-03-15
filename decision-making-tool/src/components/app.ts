import Header from '../components/view/header/header-view';
import OptionsCreatorView from './view/optionCreater/optionsCreatorView';
import router from '../components/utils/router';

class App {
  private contentContainer: HTMLElement;

  constructor() {
    this.contentContainer = document.createElement('div');
    this.contentContainer.classList.add('content');
  }

  renderApp(): void {
    const header = new Header();
    document.body.append(header.getBaseElement());

    this.setupRoutes();
    router.handleRouteChange();
  }

  private setupRoutes(): void {
    router.addRoute('/', () => this.renderOptionsCreator());
    router.addRoute('/decision-picker', () => this.renderDecisionPicker());
    window.addEventListener('popstate', () => {
      router.handleRouteChange();
    });
  }

  private renderOptionsCreator(): void {
    this.clearContent();
    const optionsCreator = new OptionsCreatorView();
    this.contentContainer.append(optionsCreator.getBaseElement());
    document.body.append(this.contentContainer);
  }

  private renderDecisionPicker(): void {}

  private clearContent(): void {
    this.contentContainer.replaceChildren();
  }
}

export default App;
