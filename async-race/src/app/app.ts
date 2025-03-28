import GarageView from './views/garage/garageView';

class App {
  private contentContainer: HTMLElement;

  constructor() {
    this.contentContainer = document.createElement('div');
    this.contentContainer.classList.add('content');
  }

  renderApp(): void {
    const garageView = new GarageView();

    this.contentContainer.append(garageView.getView());
    document.body.append(this.contentContainer);
  }
}

export default App;
