import { Message } from "../../types/types";
import { fetchingMessageHistoryWithUser, messageDeletion, messageReadStatusChange, messageTextEditing, sendingMessageToUser } from "../API/messageAPI";
import { getAuthUserLogin } from "../states/authState";
import ChatUserView from "../views/chatView/chatUsersView/chatUserView/chatUserView";

export async function getHistory(companionLogin: string): Promise<Message[]> {
  return await fetchingMessageHistoryWithUser(companionLogin);
};

export async function send(to: string, text: string): Promise<void> {
  await sendingMessageToUser(to, text);
};

export async function deleteMessage(messageId: string): Promise<void> {
  await messageDeletion(messageId);
};

export async function markAsRead(messageId: string): Promise<void> {
  await messageReadStatusChange(messageId);
};

export async function edit(messageId: string, newText: string): Promise<void> {
  await messageTextEditing(messageId, newText);
};

export async function getUnreadMessagesCount(friend: ChatUserView): Promise<number> {
  const messages = await fetchingMessageHistoryWithUser(friend.name);
  const authUser = getAuthUserLogin();
  const friendsMessages = messages.filter(message => message.from != authUser);
  const unreadMessagesLength = friendsMessages.filter(message => message.status.isReaded === false).length;
  return unreadMessagesLength;
}