import router from "../../utils/router";
import BaseView from "../baseView";
import '../chatView/chat.css';
import ChatFooterView from "./chatFooterView/chatFooterView";
import { isAuthenticated } from "../../states/authState";
import ChatHeaderView from "./chatHeaderView/chatHeaderView";
import ChatUsersListView from "./chatUsersView/chatUsersListView";
import SearchUserView from "./searchUserView/searchUserView";
import DialogueView from "../dialogueView/dialogueView";

class ChatView extends BaseView {
  private contentContainer: BaseView;
  private dialogue: DialogueView | null = null;

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
    const dialogue = new DialogueView();
    this.dialogue = dialogue;
    const usersList = this.renderUsersBlock();
    content.appendChildren([usersList, dialogue]);
    return content;
  }

  private renderUsersBlock(): BaseView {
    const content = new BaseView({ tag: 'div', classNames: ['user-block-content'] });
    const search = new SearchUserView();
    const userListContainer = new BaseView({ tag: 'div', classNames: ['users-list-container'] });
    const userListHeader = new BaseView({ tag: 'div', classNames: ['user-list-header'], textContent: 'Users' });
    if (this.dialogue) {
      const friends = new ChatUsersListView(this.dialogue);

      search.setUsers(friends);
      userListContainer.appendChildren([userListHeader, friends]);
    }
    content.appendChildren([search, userListContainer]);
    return content;
  }

  private renderChatWindow(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['chat-window'] });
  }
}
export default ChatView;