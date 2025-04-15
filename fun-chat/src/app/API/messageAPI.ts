import { Message } from "../../types/types";
import { socket } from "./socketInstance";

export async function sendingMessageToUser(login: string, text: string): Promise<Message> {
  return new Promise((resolve, reject) => {
    const requestId = Date.now().toString();
    const message = {
      id: requestId,
      type: 'MSG_SEND',
      payload: {
        message: {
          to: login,
          text: text,
        },
      },
    };

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === 'MSG_SEND' && data.id === requestId) {
        socket.removeEventListener('message', handleMessage);
        const message = data.payload.message;
        resolve(message);
      } else {
        reject('');
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

export async function receivingMessageFromUser(event: MessageEvent): Promise<void> {
  const message = JSON.parse(event.data);

  if (message.type === 'MSG_SEND') {
    return message.payload.message;
  }
}

export async function fetchingMessageHistoryWithUser(login: string): Promise<Message[]> {
  return new Promise((resolve, reject) => {
    const requestId = Date.now().toString();
    const message = {
      id: requestId,
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login: login,
        },
      },
    };

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === 'MSG_FROM_USER' && data.id === requestId) {
        socket.removeEventListener('message', handleMessage);
        const message = data.payload.messages;
        resolve(message);
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

export async function notificationOfMessageDeliveryStatusChange(event: MessageEvent): Promise<void> {
  const message = JSON.parse(event.data);

  if (message.type === 'MSG_DELIVER') {
    return message.payload.message;
  }
}

export async function messageReadStatusChange(messageId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const requestId = Date.now().toString();
    const message = {
      id: requestId,
      type: 'MSG_READ',
      payload: {
        message: {
          id: messageId,
        },
      },
    };

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === 'MSG_READ' && data.id === requestId) {
        socket.removeEventListener('message', handleMessage);
        const message = data.payload.message;
        resolve(message);
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

export async function notificationOfMessageReadStatusChange(event: MessageEvent): Promise<void> {
  const message = JSON.parse(event.data);

  if (message.type === 'MSG_READ') {
    return message.payload.message;
  }
}