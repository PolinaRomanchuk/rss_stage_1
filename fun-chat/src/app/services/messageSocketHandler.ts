import { setMessageHandler } from "../API/socketInstance";
import DialogueView from "../views/dialogueView/dialogueView";
import { Message } from "../../types/types";

let dialogue: DialogueView | null = null;

export function registerDialogueInstance(instance: DialogueView) {
  dialogue = instance;
}

export function startMessageListener() {
  setMessageHandler((event: MessageEvent) => {
    const message = JSON.parse(event.data);
    if (message.type === 'MSG_SEND') {
      const newMsg: Message = message.payload.message;
      dialogue?.addIncomingMessageToView(newMsg);
    }
    if (message.type === 'MSG_DELIVER') {
      const newMsg: Message = message.payload.message;
      dialogue?.updateMessageStatus(newMsg.id, 'delivered');
    }
    if (message.type === 'MSG_READ') {
      const newMsg: Message = message.payload.message;
      dialogue?.updateMessageStatus(newMsg.id, 'read');
    }
  });
}