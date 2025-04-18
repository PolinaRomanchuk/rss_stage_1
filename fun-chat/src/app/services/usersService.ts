import { User } from "../../types/types";
import { gettingAllAuthenticatedUsers, gettingAllUnauthorizedUsers } from "../API/usersAPI";
import { getAuthUserLogin } from "../states/authState";
import ChatUserView from "../views/chatView/chatUsersView/chatUserView/chatUserView";

export async function getAllUsers(): Promise<User[]> {
  try {
    const activeUsers = await gettingAllAuthenticatedUsers();
    const activeUsersWithoutAuthUser = avoidAuthUser(activeUsers);
    const inactiveUsers = await gettingAllUnauthorizedUsers();
    return [...activeUsersWithoutAuthUser, ...inactiveUsers];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function findUsers(input: string, users:  ChatUserView[]): ChatUserView[] {
  const search = input.trim().toLowerCase();
  if (!search) return users;
  return users.filter(friend => friend.name.toLowerCase().includes(search));
}

function avoidAuthUser(activeUsers: User[]): User[] {
  const currLogin = getAuthUserLogin();
  return activeUsers.filter(user => user.login !== currLogin);
}