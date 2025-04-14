import { User } from "../../../../types/types";
import { fetchUsers } from "../../../services/usersService";
import { subscribeToUserStatusUpdates } from "../../../states/userState";
import BaseView from "../../baseView";
import ChatUserView from "./chatUserView/chatUserView";

class ChatUsersListView extends BaseView {
  private container: BaseView;
  private friends: ChatUserView[] = [];

  constructor() {
    super({ tag: 'div', classNames: ['users-list-container'] });
    this.container = this;
    this.renderUsersList();
  }

  public async getUsers(): Promise<User[]> {
    return await fetchUsers();
  }

  private async renderUsersList() {
    const friends = await this.getUsers();
    this.drawUsers(friends);

    subscribeToUserStatusUpdates({
      onLogin: (user) => {
        this.updateUserStatus(user.login, true);
      },
      onLogout: (user) => {
        this.updateUserStatus(user.login, false);
      },
    });
  }

  private drawUsers(friends: User[]): void {
    this.friends.forEach(friend => friend.removeView());
    this.friends = [];
    this.removeAllChildren();

    friends.forEach((friend) => {
      const newFriend = new ChatUserView(friend);
      this.friends.push(newFriend);
      this.container.append(newFriend);
    });
  }

  private updateUserStatus(login: string, isActive: boolean): void {
    const userView = this.friends.find(friend => friend.getLogin() === login);
    if (userView) {
      userView.setUserStatus(isActive);
    }
  }
}

export default ChatUsersListView;