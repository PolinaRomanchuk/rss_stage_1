import App from '../src/app/app';
import '../src/global.css';
import { loadGarageStateFromStorage } from './app/states/garageState';

document.addEventListener('DOMContentLoaded', () => {
  loadGarageStateFromStorage();
  const app = new App();
  app.renderApp();
});
