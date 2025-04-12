import BaseView from "../../baseView";
import Logo from '../../../../assets/img/rss-logo.svg';
import '../chatFooterView/footer.css';

class ChatFooterView extends BaseView {
  private contentContainer: BaseView;

  constructor() {
    super({ tag: 'div', classNames: ['chat-footer-container'] });
    this.contentContainer = this;
    this.renderFooter();
  }

  private renderFooter(): BaseView {
    const logo = this.renderLogo();
    const author = new BaseView({ tag: 'span', classNames: ['author'], textContent: 'Author: Polina Romanchuk' });
    const git = this.renderGitHibLink();
    const year = new BaseView({ tag: 'div', classNames: ['year'], textContent: ' © 2025' })
    this.contentContainer.appendChildren([logo, author, git, year]);
    return this.contentContainer;
  }

  private renderLogo(): BaseView {
    const logo = new BaseView({ tag: 'div', classNames: ['school-logo-container'] });
    const icon = new BaseView({ tag: 'img', classNames: ['school-logo'] }).getView();
    if (icon instanceof HTMLImageElement) {
      icon.src = Logo;
      icon.alt = 'logo';
    }
    const schoolName = new BaseView({ tag: 'a', classNames: ['school-name'], textContent: 'RS School' });
    schoolName.getView().setAttribute('href', 'https://rs.school/');
    logo.appendChildren([icon, schoolName]);
    return logo;
  }

  private renderGitHibLink(): BaseView {
    const link = new BaseView({ tag: 'a', classNames: ['git-link'], textContent: 'GitHub' });
    const view = link.getView();
    view.setAttribute('href', 'https://github.com/PolinaRomanchuk');
    return link;
  }
}
export default ChatFooterView;