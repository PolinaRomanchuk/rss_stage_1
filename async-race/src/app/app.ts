import GarageView from './views/garage/garageView';
import router from './utils/router';
import HeaderView from './views/header/headerView';
import WinnersView from './views/winners/winnersView';

class App {
  private contentContainer: HTMLElement;
  public garage: GarageView | null = null;
  private header: HeaderView;

  constructor() {
    this.contentContainer = document.createElement('div');
    this.contentContainer.classList.add('content');
    router.setContentContainer(this.contentContainer);
    this.header = new HeaderView();
  }

  renderApp(): void {
    document.body.append(this.header.getView());
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
    this.garage = garageView;
    this.header.setCars(garageView);
  }

  private renderWinners(): void {
    this.clearContent();
    const winnersView = new WinnersView();
    this.contentContainer.append(winnersView.getView());
  }

  private clearContent(): void {
    this.contentContainer.replaceChildren();
  }
}

export default App;
