import { User } from "../../types/types";

const socket = new WebSocket('ws://localhost:4000');

export async function gettingAllAuthenticatedUsers(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    const requestId = Date.now().toString();
    const message = {
      id: requestId,
      type: 'USER_ACTIVE',
      payload: null,
    };

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === 'USER_ACTIVE' && data.id === requestId) {
        socket.removeEventListener('message', handleMessage);

        const activeUsers = data.payload.users;

        if (activeUsers) {
          resolve(activeUsers);
        } else {
          reject('Error getting users');
        }
      }
    };

    socket.addEventListener('message', handleMessage);
    socket.send(JSON.stringify(message));
  });
}

export async function gettingAllUnauthorizedUsers(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    const requestId = Date.now().toString();
    const message = {
      id: requestId,
      type: 'USER_INACTIVE',
      payload: null,
    };

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === 'USER_INACTIVE' && data.id === requestId) {
        socket.removeEventListener('message', handleMessage);

        const inactiveUsers = data.payload.users;

        if (inactiveUsers) {
          resolve(inactiveUsers);
        } else {
          reject('Error getting users');
        }
      }
    };

    socket.addEventListener('message', handleMessage);
    socket.send(JSON.stringify(message));
  });
}

export { socket };