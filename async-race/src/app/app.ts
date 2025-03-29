import GarageView from './views/garage/garageView';
import router from './utils/router';
import ErrorView from './views/errorView';
import HeaderView from './views/header/headerView';

class App {
  private contentContainer: HTMLElement;

  constructor() {
    this.contentContainer = document.createElement('div');
    this.contentContainer.classList.add('content');
    router.setContentContainer(this.contentContainer);
  }

  renderApp(): void {
    const header = new HeaderView();
    document.body.append(header.getView());
    document.body.append(this.contentContainer);

    this.setupRoutes();
    router.handleRouteChange();
  }

  private setupRoutes(): void {
    router.addRoute('', () => this.renderGarage());
    router.addRoute('winners', () => this.renderWinners());
    window.addEventListener('popstate', () => {
      router.handleRouteChange();
    });
  }

  private renderGarage(): void {
    this.clearContent();
    const garageView = new GarageView();
    this.contentContainer.append(garageView.getView());
  }

  private renderWinners(): void {
    this.clearContent();
    const errorView = new ErrorView();
    this.contentContainer.append(errorView.getView());
  }


  private clearContent(): void {
    this.contentContainer.replaceChildren();
  }
}

export default App;
