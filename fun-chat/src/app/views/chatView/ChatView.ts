import router from "../../utils/router";
import BaseView from "../baseView";
import '../chatView/chat.css';
import ChatFooterView from "./chatFooterView/chatFooterView";
import { isAuthenticated } from "../../states/authState";
import ChatHeaderView from "./chatHeaderView/chatHeaderView";
import ChatUsersListView from "./chatUsersView/chatUsersListView";
import SearchUserView from "./searchUserView/searchUserView";
import DialogueView from "../dialogueView/dialogueView";
import { registerChatViewInstance, registerDialogueInstance, startMessageListener } from "../../services/messageSocketHandler";
import { Message } from "../../../types/types";
import { fetchingMessageHistoryWithUser } from "../../API/messageAPI";
import ChatUserView from "./chatUsersView/chatUserView/chatUserView";


class ChatView extends BaseView {
  private contentContainer: BaseView;
  private dialogue: DialogueView | null = null;
  private friends: ChatUsersListView | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['chat-container'] });
    this.contentContainer = this;
    if (!isAuthenticated()) {
      this.dialogue?.removeEventListener();
      router.navigate('login');
      return;
    }
    this.renderContent();
    this.message();
    registerChatViewInstance(this);
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
    registerDialogueInstance(dialogue);
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
      this.friends = friends;

      search.setUsers(friends);
      userListContainer.appendChildren([userListHeader, friends]);
    }
    content.appendChildren([search, userListContainer]);
    return content;
  }

  private renderChatWindow(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['chat-window'] });
  }

  private message() {
    startMessageListener();
  }

  public async   addIncomingMessageToFriend(message: Message) {
    const friend = this.friends?.friends.find(x => x.name === message.from);
    if (friend) {
     const counter = await this.getAllUnreadedMessages(friend);
      friend?.unreadMessages?.setTextContent(String(counter));
      friend?.unreadMessagesContainer?.removeClass('hide');
    }

  }

  private async getAllUnreadedMessages(friend: ChatUserView) {
    const messages = await fetchingMessageHistoryWithUser(friend.name);
    const unread = messages.filter(message => message.status.isReaded === false).length;
    return unread;
  }
}
export default ChatView;