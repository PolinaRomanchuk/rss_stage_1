import { User } from "../../types/types";
import { gettingAllAuthenticatedUsers, gettingAllUnauthorizedUsers } from "../API/usersAPI";
import { getAuthUserLogin } from "../states/authState";

export async function fetchUsers(): Promise<User[]> {
  try {
    const activeUsers = await gettingAllAuthenticatedUsers();
    const activeUsersWithoutCurrentUser = avoidCurrentUser(activeUsers);
    const inactiveUsers = await gettingAllUnauthorizedUsers();
    return [...activeUsersWithoutCurrentUser, ...inactiveUsers];
  } catch (error) {
    console.error(error);
    return [];
  }
}

function avoidCurrentUser(activeUsers: User[]): User[] {
  const currLogin = getAuthUserLogin();
  return activeUsers.filter(user => user.login !== currLogin);
}