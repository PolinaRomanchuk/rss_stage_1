import InputView from "../../utils/inputView";
import router from "../../utils/router";
import BaseView from "../baseView";
import '../chatView/chat.css';
import MessageView from "./messageView";

class ChatView extends BaseView {
  private contentContainer: BaseView;

  constructor() {
    super({ tag: 'div', classNames: ['chat-container'] });
    this.contentContainer = this;
    this.renderContent();
  }

  private renderContent() {
    const window = this.renderChatWindow();
    const headerContainer = this.renderHeaderContainer();
    const content = this.renderChatContent();
    const footer = this.renderFooter();
    window.appendChildren([headerContainer, content, footer]);
    this.contentContainer.appendChildren([window]);
  }
  renderFooter(): BaseView {
    const footerContainer = new BaseView({ tag: 'div', classNames: ['footer-container'] });
    const logo = new BaseView({ tag: 'span', classNames: ['logo'], textContent: 'RS School' });
    const author = new BaseView({ tag: 'span', classNames: ['author'], textContent: 'Author: Polina Romanchuk' });
    const git = new BaseView({ tag: 'a', classNames: ['git'], textContent: 'GitHub' });
    const year = new BaseView({ tag: 'div', classNames: ['year'], textContent: ' ©2025' })
    footerContainer.appendChildren([logo, author, git, year]);
    return footerContainer;
  }
  private renderChatContent(): BaseView {
    const content = new BaseView({ tag: 'div', classNames: ['chat-content-container'] });
    const usersList = this.renderUsersList();
    const dialogue = this.renderDialogue();
    content.appendChildren([usersList, dialogue]);
    return content;
  }
  private renderDialogue(): BaseView {
    const content = new BaseView({ tag: 'div', classNames: ['dialogue-content'] });
    const companionName = new BaseView({ tag: 'span', classNames: ['companion-name'], textContent: 'Anonym' });
    const messageContainer = new BaseView({ tag: 'div', classNames: ['message-container'] });
    messageContainer.appendChildren([new MessageView(), new MessageView(),]);
    const messageInput = new InputView();
    messageInput.addClass('message-input');

    const sendBtn = new BaseView({ tag: 'button', classNames: ['send-button'], textContent: 'Send' });
    const conf = new BaseView({ tag: 'div', classNames: ['configur-message-container'] });
    conf.appendChildren([messageInput, sendBtn])
    content.appendChildren([companionName, messageContainer, conf]);
    return content;
  }
  private renderUsersList(): BaseView {
    const content = new BaseView({ tag: 'div', classNames: ['user-list-content'] });
    const userSearch = new InputView();
    userSearch.addClass('search-input');
    const userListContainer = new BaseView({ tag: 'div', classNames: ['user-list-container'] });
    const userListHeader = new BaseView({ tag: 'div', classNames: ['user-list-header'], textContent: 'Users' });
    const friend = new BaseView({ tag: 'div', classNames: ['friend'], textContent: 'test friend' });
    userListContainer.appendChildren([userListHeader, friend]);
    content.appendChildren([userSearch, userListContainer]);
    return content;
  }
  private renderHeaderContainer(): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['header-chat-container'] });
    const name = new BaseView({ tag: 'div', classNames: ['chat-name'], textContent: 'Fun chat' });
    const rightContainer = new BaseView({ tag: 'div', classNames: ['right-header-container'] });
    const userName = new BaseView({ tag: 'div', classNames: ['chat-user-name'], textContent: 'User TEST' });
    const logOutBtn = new BaseView({ tag: 'button', classNames: ['chat-logout-button'], textContent: 'Log out' });
    logOutBtn.getView().addEventListener('click', () => {
      router.navigate('');
    })
    rightContainer.appendChildren([userName, logOutBtn]);
    container.appendChildren([name, rightContainer]);
    return container;
  }
  private renderChatWindow(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['chat-window'] });
  }
}
export default ChatView;