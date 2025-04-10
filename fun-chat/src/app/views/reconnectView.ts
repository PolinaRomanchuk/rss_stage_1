import BaseView from "./baseView";
import Gif from '../../assets/img/Spinner.gif'

class ReconnectView extends BaseView {
  constructor() {
    super({ tag: 'div', classNames: ['reconnect-overlay'] });
    this.renderContent();
  }

  private renderContent() {
    const container = new BaseView({ tag: 'div', classNames: ['reconnect-container'] });
    const content = new BaseView({ tag: 'div', classNames: ['reconnect-text'], textContent: 'Trying to connect to the server' });
    const gif = this.renderGif();
    container.appendChildren([content, gif])
    this.append(container);
  }

  private renderGif(): BaseView {
    const gif = new BaseView({ tag: 'img', classNames: ['reconnect-gif'] });
    const gifElement = gif.getView()

    if (gifElement instanceof HTMLImageElement) {
      gifElement.src = Gif;
      gifElement.alt = 'Loading...';
    }
    return gif;
  }
}
export default ReconnectView;