class App {
  private contentContainer: HTMLElement;

  constructor() {
    this.contentContainer = document.createElement('div');
    this.contentContainer.classList.add('content');
  }

  renderApp(): void {
    document.body.append(this.contentContainer);
  }
}

export default App;
