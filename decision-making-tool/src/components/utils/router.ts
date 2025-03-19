import ErrorRouting from '../utils/ErrorRouting';

class Router {
  private routes: Record<string, () => void> = {};
  private contentContainer: HTMLElement | null = null;
  private basePath = '/polinaromanchuk-JSFE2024Q4/decision-making-tool';

  setContentContainer(container: HTMLElement) {
    this.contentContainer = container;
  }

  addRoute(path: string, callback: () => void) {
    this.routes[path] = callback;
  }

  navigate(path: string) {
    window.location.hash = path;
  }

  public handleRouteChange() {
    const path = window.location.hash.slice(1) || '/';
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
      this.contentContainer.append(errorPage.getBaseElement());
    }
  }
}
const router = new Router();
window.addEventListener('hashchange', () => router.handleRouteChange());

export default router;
