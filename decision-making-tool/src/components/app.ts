import Header from '../components/view/header/header-view';

class App {
  private rootElement: HTMLElement;

  constructor() {
    this.rootElement = document.createElement("div");
    document.body.appendChild(this.rootElement);
  }

  renderApp(): void {
    const header = new Header();
    this.rootElement.append(header.getBaseElement());
  }
}

export default App;
