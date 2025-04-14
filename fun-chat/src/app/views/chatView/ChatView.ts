import router from "../../utils/router";
import BaseView from "../baseView";
import '../chatView/chat.css';
import MessageView from "./messageView";
import ChatFooterView from "./chatFooterView/chatFooterView";
import OnlineUserStatus from "../components/onlineUserStatus";
import { isAuthenticated } from "../../states/authState";
import ChatHeaderView from "./chatHeaderView/chatHeaderView";
import ChatUsersListView from "./chatUsersView/chatUsersListView";
import SearchUserView from "./searchUserView/searchUserView";

class ChatView extends BaseView {
  private contentContainer: BaseView;

  constructor() {
    super({ tag: 'div', classNames: ['chat-container'] });
    this.contentContainer = this;
    if (!isAuthenticated()) {
      router.navigate('login');
      return;
    }
    this.renderContent();
  }

  private renderContent() {
    const window = this.renderChatWindow();
    const header = new ChatHeaderView();
    const content = this.renderChatContent();
    const footer = new ChatFooterView();
    window.appendChildren([header, content, footer]);
    this.contentContainer.appendChildren([window]);
  }

  private renderChatContent(): BaseView {
    const content = new BaseView({ tag: 'div', classNames: ['chat-content-container'] });
    const usersList = this.renderUsersBlock();
    const dialogue = this.renderDialogueBlock();
    content.appendChildren([usersList, dialogue]);
    return content;
  }

  private renderDialogueBlock(): BaseView {
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
    const status = new OnlineUserStatus(true);
    container.appendChildren([companionName, status]);
    return container;
  }

  private renderUsersBlock(): BaseView {
    const content = new BaseView({ tag: 'div', classNames: ['user-block-content'] });
    const search = new SearchUserView();
    const userListContainer = new BaseView({ tag: 'div', classNames: ['users-list-container'] });
    const userListHeader = new BaseView({ tag: 'div', classNames: ['user-list-header'], textContent: 'Users' });
    const friends = new ChatUsersListView();
    search.setUsers(friends);
    userListContainer.appendChildren([userListHeader, friends]);
    content.appendChildren([search, userListContainer]);
    return content;
  }

  private renderChatWindow(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['chat-window'] });
  }
}
export default ChatView;