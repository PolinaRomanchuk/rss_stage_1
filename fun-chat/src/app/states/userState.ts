import { User } from "../../types/types";
import socket from "../API/socketInstance";

let loginHandler: ((user: User) => void) | null = null;
let logoutHandler: ((user: User) => void) | null = null;

export function subscribeToUserStatusUpdates(callbacks: { onLogin?: (user: User) => void; onLogout?: (user: User) => void; }) {
  if (callbacks.onLogin) {
    loginHandler = callbacks.onLogin;
  }

  if (callbacks.onLogout) {
    logoutHandler = callbacks.onLogout;
  }
  socket.addEventListener('message', handleUserStatusUpdate);
}

function handleUserStatusUpdate(event: MessageEvent) {
  const message = JSON.parse(event.data);

  if (message.type === 'USER_EXTERNAL_LOGIN') {
    const user = message.payload.user;
    if (user?.isLogined && loginHandler) {
      loginHandler(user);
    }
  }

  if (message.type === 'USER_EXTERNAL_LOGOUT') {
    const user = message.payload.user;
    if (!user?.isLogined && logoutHandler) {
      logoutHandler(user);
    }
  }
}
