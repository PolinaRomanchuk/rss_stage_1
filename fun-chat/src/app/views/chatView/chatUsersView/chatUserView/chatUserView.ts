import { User } from "../../../../../types/types";
import BaseView from "../../../baseView";
import OnlineUserStatus from "../../../generalComponents/onlineUserStatus";

class ChatUserView extends BaseView {
  public name: string;
  public isActive: boolean;
  private statusElement: OnlineUserStatus | null = null;
  public unreadMessages: BaseView | null = null;
  public unreadMessagesContainer: BaseView | null = null;

  constructor(friend: User, onSelect: (user: ChatUserView) => void) {
    super({ tag: 'div', classNames: ['friend-container'], callback: () => onSelect(this) });
    this.name = friend.login;
    this.isActive = friend.isLogined;
    this.renderFriend();
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

  private renderFriend(): void {
    const friendContainer = new BaseView({ tag: 'div', classNames: ['friend-content'] });
    const friend = new BaseView({ tag: 'div', classNames: ['friend-name'], textContent: `${this.name}` });
    const status = new OnlineUserStatus(this.isActive);
    friendContainer.appendChildren([status, friend]);
    const messages = this.renderUnreadMessages();
    this.statusElement = status;
    this.appendChildren([friendContainer, messages]);
  }

  private renderUnreadMessages(): BaseView {
    const messages = new BaseView({ tag: 'div', classNames: ['unread-messages-container'] });
    const counter = new BaseView({ tag: 'div', classNames: ['unread-messages-counter'] });

    this.unreadMessages = counter;
    this.unreadMessagesContainer = messages;
    if (counter.getView().textContent === '') {
      this.unreadMessagesContainer.addClass('hide');
    }
    messages.append(counter);
    return messages;
  }
}

export default ChatUserView;