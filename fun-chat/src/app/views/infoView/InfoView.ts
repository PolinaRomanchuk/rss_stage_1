import BaseView from "../baseView";
import BackButton from "../components/backButton";

class InfoView extends BaseView {
  private contentContainer: BaseView;

  constructor() {
    super({ tag: 'div', classNames: ['info-container'] });
    this.contentContainer = this;
    this.renderContent();
  }
  private renderContent(): void {
    const window = this.renderAuthWindow();
    const header = this.renderHeader();
    const text = this.renderTextInfo();
    const author = this.renderAuthor();
    const backButton = new BackButton();
    const year = this.renderYear();
    const linkGitHub = this.renderLink();

    window.appendChildren([header, text, author, backButton, year, linkGitHub]);
    this.contentContainer.appendChildren([window]);

  }
  renderLink(): BaseView {
    const link = new BaseView({ tag: 'a', classNames: ['git-link'], textContent: 'GitHub' });
    const view = link.getView();
    view.setAttribute('href', 'https://github.com/PolinaRomanchuk');
    return link;
  }

  renderYear(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['info-year'], textContent: '© 2025' });
  }
  renderAuthor(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['info-author'], textContent: 'This project was created by Polina Romanchuk.' });
  }
  renderTextInfo(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['info-text'], textContent: 'Fun chat is a platform for communication.' });
  }

  private renderAuthWindow(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['info-window'] });
  }
  private renderHeader(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['info-header'], textContent: 'About us' });
  }

}
export default InfoView;