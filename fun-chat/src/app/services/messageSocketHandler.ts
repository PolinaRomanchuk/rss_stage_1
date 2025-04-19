import { setMessageHandler } from "../API/socketInstance";
import DialogueView from "../views/chatView/dialogueView/dialogueView";
import { Message } from "../../types/types";
import ChatView from "../views/chatView/chatView";

let dialogue: DialogueView | null = null;
let chatview: ChatView | null = null;


export function registerDialogueInstance(instance: DialogueView) {
  dialogue = instance;
}
export function registerChatViewInstance(instance: ChatView) {
  chatview = instance;
}

export function startMessageListener() {
  setMessageHandler((event: MessageEvent) => {
    const message = JSON.parse(event.data);
    if (message.type === 'MSG_SEND') {
      const newMsg: Message = message.payload.message;
      dialogue?.addIncomingMessageToView(newMsg);
      chatview?.addIncomingMessageToFriend(newMsg);
    }
    if (message.type === 'MSG_DELIVER') {
      const newMsg: { id: string, status: { isDelivered: boolean } } = message.payload.message;
      dialogue?.updateSendMessageStatus(newMsg.id, 'delivered');
    }
    if (message.type === 'MSG_READ') {
      const newMsg: {
        id: string,
        status: {
          isReaded: boolean,
        }
      } = message.payload.message;
      dialogue?.updateSendMessageStatus(newMsg.id, 'read');
      chatview?.updateUnreadMessagesCounter(newMsg);
    }
    if (message.type === 'MSG_EDIT') {
      const newMsg: Message = message.payload.message;
      dialogue?.updateMessageStatusEdit(newMsg.id, 'edit');
    }
    if (message.type === 'MSG_DELETE') {
      //  const newMsg: Message = message.payload.message;
      // dialogue?.updateMessageStatus(newMsg.id, 'read');
    }
  });
}