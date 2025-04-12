import InputView from "../../utils/inputView";
import router from "../../utils/router";
import BaseView from "../baseView";
import '../chatView/chat.css';
import MessageView from "./messageView";
import SearchIcone from '../../../assets/img/search.png';
import ChatFooterView from "./chatFooterView/chatFooterView";
import OnlineUserStatus from "../components/onlineUserStatus";

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
    const footer = new ChatFooterView();
    window.appendChildren([headerContainer, content, footer]);
    this.contentContainer.appendChildren([window]);
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
    const companionName = this.renderCompanionName();
    const messageContainer = new BaseView({ tag: 'div', classNames: ['message-container'] });
    const wraper = new BaseView({ tag: 'div', classNames: ['messages-wrapper'] });
    wraper.appendChildren([new MessageView(), new MessageView(), new MessageView(), new MessageView()]);
    messageContainer.appendChildren([wraper]);
    const messageInput = this.renderMessageTextArea();

    const sendBtn = new BaseView({ tag: 'button', classNames: ['send-button'], textContent: 'Send' });
    const conf = new BaseView({ tag: 'div', classNames: ['configur-message-container'] });
    conf.appendChildren([messageInput, sendBtn])
    content.appendChildren([companionName, messageContainer, conf]);
    return content;
  }

  private renderMessageTextArea(): BaseView {
    const messageArea = new BaseView({ tag: 'textarea', classNames: ['message-input'] });
    return messageArea;
  }

  private renderCompanionName(): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['companion-name-container'] });
    const companionName = new BaseView({ tag: 'div', classNames: ['friend-name'], textContent: 'Anonym' });
    const status = new OnlineUserStatus();
    container.appendChildren([companionName, status]);
    return container;
  }

  private renderUsersList(): BaseView {
    const content = new BaseView({ tag: 'div', classNames: ['user-list-content'] });
    const search = this.renderSearch();
    const userListContainer = new BaseView({ tag: 'div', classNames: ['user-list-container'] });
    const userListHeader = new BaseView({ tag: 'div', classNames: ['user-list-header'], textContent: 'Users' });
    const friend = this.renderFriend();
    userListContainer.appendChildren([userListHeader, friend]);
    content.appendChildren([search, userListContainer]);
    return content;
  }

  private renderFriend(): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['friend-container'] });
    const friend = new BaseView({ tag: 'div', classNames: ['friend'], textContent: 'test friend' });
    const status = new OnlineUserStatus();
    container.appendChildren([friend, status])
    return container;
  }

  private renderSearch(): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['search-container'] });
    const icon = this.renderIcon();
    const userSearch = new InputView();
    userSearch.addClass('search-input');
    userSearch.setPlaceholder('Search');
    container.appendChildren([icon, userSearch]);
    return container;
  }

  private renderIcon(): BaseView {
    const button = new BaseView({ tag: 'button', classNames: ['search-button'] });

    const icon = new BaseView({ tag: 'img', classNames: ['search-icon'] });
    const iconElement = icon.getView()

    if (iconElement instanceof HTMLImageElement) {
      iconElement.src = SearchIcone;
      iconElement.alt = 'Search';
    }
    button.appendChildren([icon]);
    return button;
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