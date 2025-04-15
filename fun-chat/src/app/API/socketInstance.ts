const socket = new WebSocket('ws://localhost:4000');

function setMessageHandler(handler: (event: MessageEvent) => void) {
  socket.addEventListener('message', handler);
}

export { socket, setMessageHandler };