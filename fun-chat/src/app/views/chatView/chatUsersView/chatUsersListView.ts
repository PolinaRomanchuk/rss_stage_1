import { User } from "../../../../types/types";
import { getAllUsers } from "../../../services/usersService";
import BaseView from "../../baseView";
import DialogueView from "../dialogueView/dialogueView";
import ChatUserView from "./chatUserView/chatUserView";

class ChatUsersListView extends BaseView {
  public friendsList: ChatUserView[] = [];
  public selectedUser: ChatUserView | null = null;
  private dialogueView: DialogueView;

  constructor(dialogueView: DialogueView) {
    super({ tag: 'div', classNames: ['users-list-container'] });
    this.dialogueView = dialogueView;
    this.renderUsersList();
  }

  private async renderUsersList(): Promise<void> {
    const friends = await getAllUsers();
    this.drawUsers(friends);
  }

  private drawUsers(friends: User[]): void {
    this.friendsList = [];
    this.removeAllChildren();

    friends.forEach((friend) => this.createNewUser(friend));
  }

  public updateUserStatus(login: string, isActive: boolean): void {
    const userView = this.friendsList.find(friend => friend.getFriendLogin() === login);
    if (userView) {
      userView.setFriendStatus(isActive);
    }
  }

  public checkIfUserExist(user: User): void {
    const userView = this.friendsList.find(friend => friend.getFriendLogin() === user.login);
    if (!userView) {
      this.createNewUser(user);
    }
  }

  private createNewUser(user: User) {
    const newFriend = new ChatUserView(user, (userView) => {
      this.selectedUser = userView;
      this.dialogueView.setCompanion(userView);
    });
    this.friendsList.push(newFriend);
    this.append(newFriend);
  }
}

export default ChatUsersListView;