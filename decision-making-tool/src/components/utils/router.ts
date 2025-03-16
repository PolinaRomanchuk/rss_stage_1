import ErrorRouting from '../utils/ErrorRouting';

class Router {
  private routes: Record<string, () => void> = {};

  addRoute(path: string, callback: () => void) {
    this.routes[path] = callback;
  }

  navigate(path: string) {
    window.history.pushState({}, '', path);
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
    const errorPage = new ErrorRouting();
    document.body.innerHTML = '';
    document.body.append(errorPage.getBaseElement());
  }
}
const router = new Router();
export default router;
