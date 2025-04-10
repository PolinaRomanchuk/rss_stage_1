import router from './utils/router';
import AuthenticationView from './views/authenticationView/authenticationView';
import BaseView from './views/baseView';
import ChatView from './views/chatView/ChatView';
import InfoView from './views/infoView/InfoView';

class App {
  private contentContainer: HTMLElement;

  constructor() {
    this.contentContainer = this.createContainer();
    router.setContentContainer(this.contentContainer);
  }

  private createContainer(): HTMLElement {
    const content = new BaseView({ tag: 'div', classNames: ['content'] })
    return content.getView();
  }

  renderApp(): void {
    document.body.append(this.contentContainer);
    this.setupRoutes();
    router.handleRouteChange();
  }

  private setupRoutes(): void {
    router.addRoute('', () => this.renderAuthentication());
    router.addRoute('chat', () => this.renderChat());
    router.addRoute('info', () => this.renderInfo());
    window.addEventListener('popstate', () => {
      router.handleRouteChange();
    });
  }

  private renderAuthentication(): void {
    this.clearContent();
    const authView = new AuthenticationView();
    this.contentContainer.append(authView.getView());
  }

  private renderChat(): void {
    this.clearContent();
      const chatView = new ChatView();
    this.contentContainer.append(chatView.getView());
  }

  private renderInfo(): void {
    this.clearContent();
    const infoView = new InfoView();
    this.contentContainer.append(infoView.getView());
  }

  private clearContent(): void {
    this.contentContainer.replaceChildren();
  }
}

export default App;