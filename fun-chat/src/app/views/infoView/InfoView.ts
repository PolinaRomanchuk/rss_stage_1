import BaseView from "../baseView";
import BackButton from "../generalComponents/backButton";
import '../infoView/info.css';

class InfoView extends BaseView {
  private contentContainer: BaseView;

  constructor() {
    super({ tag: 'div', classNames: ['info-container'] });
    this.contentContainer = this;
    this.renderContent();
  }

  private renderContent(): void {
    const content = new BaseView({ tag: 'div', classNames: ['info-content'] });
    const header = this.renderHeader();
    const text = this.renderText();
    const author = this.renderAuthor();
    const backButton = new BackButton();
    const year = this.renderYear();
    const linkGitHub = this.renderLink();

    content.appendChildren([header, text, author, backButton, year, linkGitHub]);
    this.contentContainer.appendChildren([content]);
  }

  private renderHeader(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['info-header'], textContent: 'About us' });
  }

  private renderText(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['info-text'], textContent: 'Fun chat is a platform for communication.' });
  }

  private renderAuthor(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['info-author'], textContent: 'This project was created by Polina Romanchuk.' });
  }

  private renderYear(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['info-year'], textContent: '© 2025' });
  }

  private renderLink(): BaseView {
    const link = new BaseView({ tag: 'a', classNames: ['git-link'], textContent: 'GitHub' });
    const view = link.getView();
    view.setAttribute('href', 'https://github.com/PolinaRomanchuk');
    return link;
  }
}
export default InfoView;