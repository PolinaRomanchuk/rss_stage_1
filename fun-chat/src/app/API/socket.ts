import { getAllUsers } from "../services/usersService";
import { getAuthUserLogin, getAuthUserPassword } from "../states/authState";
import ReconnectView from "../views/generalComponents/reconnectView";
import { authenticateUserApi } from "./authAPI";

const SERVER_URL = 'ws://localhost:4000';

let socket: WebSocket;
let reconnectView: ReconnectView | null = null;
let isReconnecting = false;
const messageHandlers: ((event: MessageEvent) => void)[] = [];

let resolveAuth: (() => void) | null = null;
const onAuthenticated = new Promise<void>((resolve) => {
  resolveAuth = resolve;
});

function createSocket(): WebSocket {
  const newSocket = new WebSocket(SERVER_URL);

  newSocket.addEventListener('open', onOpen);
  newSocket.addEventListener('close', onClose);
  newSocket.addEventListener('error', onError);

  return newSocket;
}

async function onOpen() {
  if (reconnectView) {
    reconnectView.removeView();
    reconnectView = null;
  }

  const login = getAuthUserLogin();
  const password = getAuthUserPassword();

  if (login && password) {
    authenticateUserApi(login, password).then(async () => {
      await getAllUsers();
      resolveAuth?.();
    })
      .catch((err) => console.error('Reauth error', err));
  }

  messageHandlers.forEach((handler) => {
    socket.addEventListener('message', handler);
  });

  isReconnecting = false;
}

function onClose(): void {
  reconnect();
}

function onError(): void {
  socket.close();
}

function reconnect(): void {
  if (!isReconnecting) {
    isReconnecting = true;
    showReconnectView();
  }

  socket = createSocket();
  setTimeout(() => {
    if (socket.readyState !== WebSocket.OPEN) {
      socket.close();
    }
  }, 3000);
}

function showReconnectView(): void {
  if (!reconnectView) {
    reconnectView = new ReconnectView();
    document.body.appendChild(reconnectView.getView());
  }
}

function setMessageHandler(handler: (event: MessageEvent) => void): void {
  messageHandlers.push(handler);
  if (socket.readyState === WebSocket.OPEN) {
    socket.addEventListener('message', handler);
  }
  else {
    socket.addEventListener('open', () => {
      socket.addEventListener('message', handler);
    });
  }
}

function sendMessage(data: string): void {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(data);
  }
}

socket = createSocket();

export { socket, setMessageHandler, sendMessage, onAuthenticated };