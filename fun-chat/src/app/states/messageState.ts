import DialogueView from "../views/chatView/dialogueView/dialogueView";
import { DeleteMessageResponse, DeliverMessageResponse, EditMessageResponse, Message, ReadMessageResponse } from "../../types/types";
import ChatView from "../views/chatView/chatView";
import { setMessageHandler } from "../API/socket";

let dialogue: DialogueView | null = null;
let chatview: ChatView | null = null;

export function registerDialogueViewInstance(instance: DialogueView) {
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
      chatview?.setUnreadIncomingMessagesCounter(newMsg);
    }
    if (message.type === 'MSG_DELIVER') {
      const newMsg: DeliverMessageResponse = message.payload.message;
      dialogue?.updateSendMessageStatus(newMsg.id, 'delivered');
    }
    if (message.type === 'MSG_READ') {
      const newMsg: ReadMessageResponse = message.payload.message;
      dialogue?.updateSendMessageStatus(newMsg.id, 'read');
      chatview?.handleUnreadMessagesCounter(newMsg);
    }
    if (message.type === 'MSG_EDIT') {
      const newMsg: EditMessageResponse = message.payload.message;
      dialogue?.updateEditMessageStatus(newMsg.id, 'edit');
    }
    if (message.type === 'MSG_DELETE') {
      const newMsg: DeleteMessageResponse = message.payload.message;
      dialogue?.deleteMessageView(newMsg.id);
    }
  });
}