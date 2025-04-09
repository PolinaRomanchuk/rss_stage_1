
class App {

  constructor() {
  }

  renderApp(): void {
    const test = document.createElement('div');
    test.textContent = 'Hello';
    document.body.append(test);
  }
}

export default App;