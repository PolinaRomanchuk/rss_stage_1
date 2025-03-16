import ErrorRouting from '../utils/ErrorRouting';

class Router {
  private routes: Record<string, () => void> = {};
  private contentContainer: HTMLElement | null = null;
  private basePath = '/polinaromanchuk-JSFE2024Q4/decision-making-tool';

  setContentContainer(container: HTMLElement) {
    this.contentContainer = container;
  }

  addRoute(path: string, callback: () => void) {
    this.routes[`${this.basePath}${path}`] = callback;
  }

  navigate(path: string) {
    window.history.pushState({}, '', `${this.basePath}${path}`);
    this.handleRouteChange();
  }

  public handleRouteChange() {
    const path = window.location.pathname;
    const routeCallback = this.routes[path];

    if (routeCallback) {
      routeCallback();
    } else {
      this.renderErrorPage();
    }
  }

  private renderErrorPage() {
    if (this.contentContainer) {
      const errorPage = new ErrorRouting();
      this.contentContainer.replaceChildren();
      document.body.append(errorPage.getBaseElement());
    }
  }
}
const router = new Router();
export default router;
