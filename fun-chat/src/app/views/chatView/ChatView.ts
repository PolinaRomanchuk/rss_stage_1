import router from "../../utils/router";
import BaseView from "../baseView";
import '../chatView/chat.css';
import ChatFooterView from "./chatFooterView/chatFooterView";
import { isAuthenticated } from "../../states/authState";
import ChatHeaderView from "./chatHeaderView/chatHeaderView";
import ChatUsersListView from "./chatUsersView/chatUsersListView";
import SearchUserView from "./chatUsersView/searchUserView/searchUserView";
import DialogueView from "./dialogueView/dialogueView";
import { registerChatViewInstance, registerDialogueViewInstance, startMessageListener } from "../../states/messageState";
import { Message, ReadMessageResponse } from "../../../types/types";
import { subscribeToUserStatusUpdates } from "../../states/userState";
import ChatUserView from "./chatUsersView/chatUserView/chatUserView";
import { getUnreadMessagesCount } from "../../services/messagesService";

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
    this.initMessagesListener();
    registerChatViewInstance(this);
    this.initUsersStatusListeners();
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
    registerDialogueViewInstance(dialogue);
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

  public async setUnreadIncomingMessagesCounter(message: Message): Promise<void> {
    const friend = this.friends?.friendsList.find(x => x.name === message.from);
    if (friend) {
      this.updateUnreadCounter(friend);
    }
  }

  public async handleUnreadMessagesCounter(message: ReadMessageResponse): Promise<void> {
    const messageView = this.dialogue?.messageViews.find(view => view.messageId === message.id) || null;
    const messageSender = messageView?.message.from;
    const friend = this.friends?.friendsList.find(x => x.name === messageSender);
    if (friend) {
      this.updateUnreadCounter(friend);
    }
  }

  private async updateUnreadCounter(friend: ChatUserView): Promise<void> {
    const counter = await getUnreadMessagesCount(friend);
    friend?.unreadMessages?.setTextContent(String(counter));
    friend?.unreadMessagesContainer?.removeClass('hide');
    if (counter == 0) {
      friend?.unreadMessagesContainer?.addClass('hide');
    }
  }

  private initUsersStatusListeners(): void {
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

  private initMessagesListener(): void {
    startMessageListener();
  }
}
export default ChatView;