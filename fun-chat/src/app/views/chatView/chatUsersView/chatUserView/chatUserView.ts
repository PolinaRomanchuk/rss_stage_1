import { User } from "../../../../../types/types";
import { fetchingMessageHistoryWithUser } from "../../../../API/messageAPI";
import BaseView from "../../../baseView";
import OnlineUserStatus from "../../../generalComponents/onlineUserStatus";

class ChatUserView extends BaseView {
  public name: string;
  public isActive: boolean;
  private statusElement: OnlineUserStatus | null = null;
  public unreadMessages: BaseView | null = null;
  public unreadMessagesContainer: BaseView | null = null;
  private currentFriend: User;

  constructor(friend: User, onSelect: (user: ChatUserView) => void) {
    super({ tag: 'div', classNames: ['friend-container'], callback: () => onSelect(this) });
    this.name = friend.login;
    this.isActive = friend.isLogined;
    this.currentFriend = friend;
  }

  public async init(): Promise<void> {
    await this.renderFriend();
  }

  public getFriendLogin(): string {
    return this.name;
  }

  public setFriendStatus(isActive: boolean): void {
    this.isActive = isActive;
    if (this.statusElement) {
      this.statusElement.setStatus(isActive);
    }
  }

  private async renderFriend(): Promise<void> {
    const friendContainer = new BaseView({ tag: 'div', classNames: ['friend-content'] });
    const friend = new BaseView({ tag: 'div', classNames: ['friend-name'], textContent: `${this.name}` });
    const status = new OnlineUserStatus(this.isActive);
    friendContainer.appendChildren([status, friend]);
    const messages = await this.renderUnreadMessages();
    this.statusElement = status;
    this.appendChildren([friendContainer, messages]);
  }

  private async renderUnreadMessages(): Promise<BaseView> {
    const messages = new BaseView({ tag: 'div', classNames: ['unread-messages-container'] });
    const counter = new BaseView({ tag: 'div', classNames: ['unread-messages-counter'] });

    this.unreadMessages = counter;
    this.unreadMessagesContainer = messages;


    const unreadMessagesNumber = await this.getUnreadMessages();
    if (unreadMessagesNumber != 0) {
      this.unreadMessages.setTextContent(String(unreadMessagesNumber));
      this.unreadMessagesContainer.removeClass('hide');
    }

    if (unreadMessagesNumber == 0) {
      this.unreadMessages.setTextContent('');
      this.unreadMessagesContainer.addClass('hide');
    }

    messages.append(counter);
    return messages;
  }

  private async getUnreadMessages(): Promise<number> {
    const messages = await fetchingMessageHistoryWithUser(this.name);
    const messagesfromFriend = messages.filter(message => message.from === this.currentFriend.login);
    const unread = messagesfromFriend.filter(message => message.status.isReaded === false).length;
    return unread;
  }
}

export default ChatUserView;