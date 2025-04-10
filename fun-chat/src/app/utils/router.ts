import ErrorView from '../views/errorView';

class Router {
  private routes: Record<string, () => void> = {};
  private contentContainer: HTMLElement | null = null;

  setContentContainer(container: HTMLElement): void {
    this.contentContainer = container;
  }

  addRoute(path: string, callback: () => void): void {
    this.routes[path] = callback;
  }

  navigate(path: string): void {
    window.location.hash = `#${path}`;
  }

  public handleRouteChange(): void {
    const path = window.location.hash.replace(/^#/, '') || '';
    const routeCallback = this.routes[path];

    if (routeCallback) {
      routeCallback();
    } else {
      this.renderErrorPage();
    }
  }

  private renderErrorPage(): void {
    if (this.contentContainer) {
      const errorPage = new ErrorView();
      this.contentContainer.replaceChildren();
      this.contentContainer.append(errorPage.getView());
    }
  }
}
const router = new Router();
window.addEventListener('hashchange', () => router.handleRouteChange());

export default router;