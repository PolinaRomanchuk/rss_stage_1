import { User } from "../../../../../types/types";
import BaseView from "../../../baseView";
import OnlineUserStatus from "../../../components/onlineUserStatus";

class ChatUserView extends BaseView {
  private container: BaseView;
  private name: string;
  private isActive: boolean;

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
    this.container.appendChildren([friend, status]);
  }
}
export default ChatUserView;