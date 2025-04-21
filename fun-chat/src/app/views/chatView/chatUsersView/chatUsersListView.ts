import { User } from "../../../../types/types";
import { onAuthenticated } from "../../../API/socket";
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
    this.init();
    this.renderUsersList();
  }

  private async init(): Promise<void> {
    const friends = await getAllUsers();
    this.drawUsers(friends);
  }

  private async renderUsersList(): Promise<void> {
    await onAuthenticated;
    const friends = await getAllUsers();
    this.drawUsers(friends);
  }

  private async drawUsers(friends: User[]): Promise<void> {
    this.friendsList = [];
    this.removeAllChildren();

    await Promise.all(friends.map(async (user) => await this.createNewUser(user)));
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

  private async createNewUser(user: User): Promise<void> {
    const newFriend = new ChatUserView(user, (userView) => {
      this.selectedUser = userView;
      this.dialogueView.setCompanion(userView);
    });
    await newFriend.init();
    this.friendsList.push(newFriend);
    this.append(newFriend);
  }
}

export default ChatUsersListView;