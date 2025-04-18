import { clearAuth, setAuthUser } from "../states/authState";
import {socket} from '../API/socketInstance';

export async function authenticateUserApi(username: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const requestId = Date.now().toString();
    const message = {
      id: requestId,
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: username,
          password: password,
        },
      },
    };

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === 'USER_LOGIN' && data.id === requestId) {
        socket.removeEventListener('message', handleMessage);

        const isLogined = data.payload.user.isLogined;

        if (isLogined) {
          setAuthUser(username, password);
          resolve();
        } 
      }

      if (data.type === 'ERROR' && data.id === requestId) {
        socket.removeEventListener('message', handleMessage);
        const error = data.payload.error;
        reject(error);
        return;
      }
    };

    socket.addEventListener('message', handleMessage);
    socket.send(JSON.stringify(message));
  });
}

export async function logoutUserApi(username: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const requestId = Date.now().toString();
    const message = {
      id: requestId,
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login: username,
          password: password,
        },
      },
    };

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === 'USER_LOGOUT' && data.id === requestId) {
        socket.removeEventListener('message', handleMessage);
        clearAuth();
        resolve();
      }

      if (data.type === 'ERROR' && data.id === requestId) {
        socket.removeEventListener('message', handleMessage);
        const error = data.payload.error;
        reject(error);
        return;
      }
    };

    socket.addEventListener('message', handleMessage);
    socket.send(JSON.stringify(message));
  });
}
