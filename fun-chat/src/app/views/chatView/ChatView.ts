import router from "../../utils/router";
import BaseView from "../baseView";
import '../chatView/chat.css';
import ChatFooterView from "./chatFooterView/chatFooterView";
import { isAuthenticated } from "../../states/authState";
import ChatHeaderView from "./chatHeaderView/chatHeaderView";
import ChatUsersListView from "./chatUsersView/chatUsersListView";
import SearchUserView from "./chatUsersView/searchUserView/searchUserView";
import DialogueView from "./dialogueView/dialogueView";
import { registerChatViewInstance, registerDialogueInstance, startMessageListener } from "../../services/messageSocketHandler";
import { Message } from "../../../types/types";
import { fetchingMessageHistoryWithUser } from "../../API/messageAPI";
import ChatUserView from "./chatUsersView/chatUserView/chatUserView";
import { subscribeToUserStatusUpdates } from "../../states/userState";

class ChatView extends BaseView {
  private dialogue: DialogueView | null = null;
  private friends: ChatUsersListView | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['chat-container'] });

    if (!isAuthenticated()) {
      this.dialogue?.sendButton?.removeKeyHandler();
      router.navigate('login');
      return;
    }
    this.renderContent();
    this.message();
    registerChatViewInstance(this);
    this.initStatusListeners();
  }

  private renderContent(): void {
    const window = new BaseView({ tag: 'div', classNames: ['chat-content'] });
    const header = new ChatHeaderView();
    const content = this.renderChatContent();
    const footer = new ChatFooterView();
    window.appendChildren([header, content, footer]);
    this.appendChildren([window]);
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
    const content = new BaseView({ tag: 'div', classNames: ['users-container'] });
    const search = new SearchUserView();
    const userListContainer = new BaseView({ tag: 'div', classNames: ['users-content'] });
    const userListHeader = new BaseView({ tag: 'div', classNames: ['users-header'], textContent: 'Users' });
    if (this.dialogue) {
      const friends = new ChatUsersListView(this.dialogue);
      this.friends = friends;

      search.setUsers(friends);
      userListContainer.appendChildren([userListHeader, friends]);
    }
    content.appendChildren([search, userListContainer]);
    return content;
  }

  private message(): void {
    startMessageListener();
  }

  public async addIncomingMessageToFriend(message: Message): Promise<void> {
    const friend = this.friends?.friendsList.find(x => x.name === message.from);
    if (friend) {
      const counter = await this.getAllUnreadedMessages(friend);
      friend?.unreadMessages?.setTextContent(String(counter));
      friend?.unreadMessagesContainer?.removeClass('hide');
    }
  }

  private async getAllUnreadedMessages(friend: ChatUserView): Promise<number> {
    const messages = await fetchingMessageHistoryWithUser(friend.name);
    const unread = messages.filter(message => message.status.isReaded === false).length;
    return unread;
  }

  private initStatusListeners(): void {
    subscribeToUserStatusUpdates({
      onLogin: (user) => {
        this.friends?.checkIfUserExist(user)
        this.friends?.updateUserStatus(user.login, true)
        this.dialogue?.updateUserStatus(user.login, true)
      },
      onLogout: (user) => {
        this.friends?.updateUserStatus(user.login, false)
        this.dialogue?.updateUserStatus(user.login, false)
      },
    });
  }
}
export default ChatView;