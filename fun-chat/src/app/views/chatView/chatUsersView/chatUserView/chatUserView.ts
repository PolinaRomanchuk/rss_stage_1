import { User } from "../../../../../types/types";
import BaseView from "../../../baseView";
import OnlineUserStatus from "../../../components/onlineUserStatus";

class ChatUserView extends BaseView {
  private container: BaseView;
  public name: string;
  private isActive: boolean;
  private statusElement: OnlineUserStatus | null = null;

  constructor(friend: User) {
    super({ tag: 'div', classNames: ['friend-container'] });
    this.container = this;
    this.name = friend.login;
    this.isActive = friend.isLogined;
    this.renderFriend();
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