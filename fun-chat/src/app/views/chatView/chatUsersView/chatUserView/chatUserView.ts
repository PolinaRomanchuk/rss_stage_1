import { User } from "../../../../../types/types";
import BaseView from "../../../baseView";
import OnlineUserStatus from "../../../components/onlineUserStatus";

class ChatUserView extends BaseView {
  private container: BaseView;
  public name: string;
  public isActive: boolean;
  public selectedUser: ChatUserView | null = null;
  private statusElement: OnlineUserStatus | null = null;

  constructor(friend: User, onSelect: (user: ChatUserView) => void) {
    super({ tag: 'div', classNames: ['friend-container'], callback: () => onSelect(this) });
    this.container = this;
    this.name = friend.login;
    this.isActive = friend.isLogined;
    this.renderFriend();
  }
  public selectUser(): ChatUserView {
    this.selectedUser = this;
    return this.selectedUser;
  }

  private renderFriend(): void {
    const friend = new BaseView({ tag: 'div', classNames: ['friend'], textContent: `${this.name}` });
    const status = new OnlineUserStatus(this.isActive);
    this.statusElement = status;
    this.container.appendChildren([friend, status]);
  }

  public getLogin(): string {
    return this.name;
  }

  public setUserStatus(isActive: boolean): void {
    this.isActive = isActive;
    if (this.statusElement) {
      this.statusElement.setStatus(isActive);
    }
  }

}
export default ChatUserView;