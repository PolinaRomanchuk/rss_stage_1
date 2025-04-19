import { Message } from "../../../../types/types";
import { fetchingMessageHistoryWithUser, messageDeletion, messageReadStatusChange, messageTextEditing, sendingMessageToUser } from "../../../API/messageAPI";
import { getAuthUserLogin } from "../../../states/authState";
import BaseView from "../../baseView";
import ChatUserView from "../chatUsersView/chatUserView/chatUserView";
import MessageView from "./messageView";
import OnlineUserStatus from "../../generalComponents/onlineUserStatus";
import SendButton from "./sendButton";

class DialogueView extends BaseView {
  private currentCompanion: ChatUserView | null = null;
  private currentCompanionStatus: OnlineUserStatus | null = null;
  private companionNameElement: BaseView | null = null;
  private messagesWraper: BaseView | null = null;
  private newMessageInput: BaseView | null = null;
  public messageViews: MessageView[] = [];
  private selectedMessage: MessageView | null = null;

  private messagesContainer: BaseView | null = null;
  private firstUnreadMessageView: MessageView | null = null;

  public sendButton: SendButton | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['dialogue-container'] });
    this.renderDialogue();
  }

  private renderDialogue(): void {
    const companionName = this.renderCompanion();
    const messageContainer = new BaseView({ tag: 'div', classNames: ['messages-container'] });
    this.messagesContainer = messageContainer;

    const messagesWraper = new BaseView({ tag: 'div', classNames: ['messages-wrapper'] });
    this.messagesWraper = messagesWraper;
    messageContainer.appendChildren([messagesWraper]);
    const messageInput = this.renderMessageTextArea();

    const sendBtn = new SendButton(this.handleSendButtonClick.bind(this));
    this.sendButton = sendBtn;

    const conf = new BaseView({ tag: 'div', classNames: ['configur-message-container'] });
    conf.appendChildren([messageInput, sendBtn]);
    this.appendChildren([companionName, messageContainer, conf]);


    this.messagesWraper?.getView().addEventListener('click', () => {
      this.removeUnreadMarker();
    });
  }

  private async handleSendButtonClick(): Promise<void> {
    if (this.selectedMessage) {
      await this.editSelectedMessage();
    } else {
      await this.send();
    }
    this.removeUnreadMarker();
    await this.getMessageHistory();
  }

  private removeUnreadMarker(): void {
    if (this.firstUnreadMessageView?.unreadMarker) {
      this.firstUnreadMessageView.unreadMarker.removeView();
      this.firstUnreadMessageView.unreadMarker = null;
      this.firstUnreadMessageView = null;
    }
  }

  private async getMessageHistory(): Promise<void> {
    const loginCompanion = this.currentCompanion?.name;
    if (!loginCompanion || !this.messagesWraper) return;

    const messages = await fetchingMessageHistoryWithUser(loginCompanion);
    this.messagesWraper.removeAllChildren();
    this.messageViews = [];

    if (messages.length === 0) {
      this.messagesWraper.append(this.renderDefaultMessage());
    } else {
      this.renderMessages(messages);
    }

    if (this.firstUnreadMessageView) {
      this.scrollToMessage(this.firstUnreadMessageView);
    } else {
      this.scrollMessagesToBottom();
    }
  }

  private renderMessages(messages: Message[]) {
    let foundUnread = false;
    this.firstUnreadMessageView = null;

    messages.forEach(message => {
      if (this.messagesWraper) {
        const view = new MessageView(message, this.selectMessage.bind(this), this.setTextAreaByTextFromMessageToEdit.bind(this), this.deleteMessage.bind(this));
        this.messagesWraper.append(view);
        this.messageViews.push(view);

        if (!foundUnread && message.from !== getAuthUserLogin() && !message.status.isReaded) {
          view.showUnreadMarker(this.messagesWraper.getView());
          this.firstUnreadMessageView = view;
          foundUnread = true;
        }
      }
    });
  }

  private scrollToMessage(messageView: MessageView): void {
    const messageElement = messageView.getView();
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  private findMessageById(messageId: string): MessageView | null {
    return this.messageViews.find(view => view.messageId === messageId) || null;
  }

  private async send(): Promise<void> {
    let text = '';
    const textarea = this.newMessageInput?.getView();
    if (textarea instanceof HTMLTextAreaElement) {
      text = textarea.value;
      const login = this.currentCompanion?.name;

      if (login && text != '') {
        await sendingMessageToUser(login, text);
      }
      textarea.value = '';
      this.scrollMessagesToBottom();
    }
  }

  private renderMessageTextArea(): BaseView {
    const messageArea = new BaseView({ tag: 'textarea', classNames: ['message-input'] });
    this.newMessageInput = messageArea;
    return messageArea;
  }

  private renderCompanion(): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['companion-name-container'] });
    const companionName = new BaseView({ tag: 'div', classNames: ['friend-name-in-dialogue'] });
    this.companionNameElement = companionName;
    const status = new OnlineUserStatus(true);
    status.changeClass('add', 'hide');
    this.currentCompanionStatus = status;
    container.appendChildren([companionName, status]);
    return container;
  }

  public setCompanion(user: ChatUserView): void {
    this.currentCompanion = user;
    this.removeUnreadMarker();
    if (this.companionNameElement && this.currentCompanionStatus) {
      this.companionNameElement.setTextContent(user.name);
      this.currentCompanionStatus.setStatus(user.isActive);
      this.currentCompanionStatus.changeClass('remove', 'hide');
      this.getMessageHistory().then(() => {
        this.messageViews.forEach(msgView => {
          if (msgView.messageId && this.currentCompanion?.name === msgView.message.from) {
            messageReadStatusChange(msgView.messageId);
          }
        });
      });
    }
  }

  private renderDefaultMessage(): BaseView {
    const defaultMessage = new BaseView({ tag: 'div', classNames: ['say-hi-message'], textContent: 'Say hi to start talking' });
    return defaultMessage;
  }

  public addIncomingMessageToView(message: Message): void {
    if (this.messagesWraper && this.currentCompanion?.name === message.from) {
      this.messagesWraper.append(new MessageView(message, this.selectMessage.bind(this), this.setTextAreaByTextFromMessageToEdit.bind(this), this.deleteMessage.bind(this)));
      this.scrollMessagesToBottom();
    }
  }

  public updateSendMessageStatus(messageId: string, status: 'sent' | 'delivered' | 'read'): void {
    const messageView = this.findMessageById(messageId);
    if (messageView) {
      messageView.setSendStatus(status);
    }
  }

  public updateMessageStatusEdit(messageId: string, status: 'edit'): void {
    const messageView = this.findMessageById(messageId);
    if (messageView) {
      messageView.setEditStatus(status);
    }
  }

  public async deleteMessage(message: MessageView): Promise<void> {
    this.selectedMessage = message;
    if (this.selectedMessage?.message.from === getAuthUserLogin()) {
      await messageDeletion(message.messageId);
      message.contentContainer.removeView();
    } else {
      return;
    }
  }

  public deleteMessageView(messageId: string): void {
    const messageView = this.findMessageById(messageId);
    if (messageView) {
      messageView.removeView();
    }
  }

  public async setTextAreaByTextFromMessageToEdit(message: MessageView): Promise<void> {
    this.selectedMessage = message;
    if (this.selectedMessage?.message.from === getAuthUserLogin()) {
      const textarea = this.newMessageInput?.getView();
      if (textarea instanceof HTMLTextAreaElement) {
        textarea.value = this.selectedMessage.message.text;
      }
    } else {
      return;
    }
  }

  public async selectMessage(message: MessageView): Promise<void> {
    this.selectedMessage = message;
    if (this.selectedMessage?.message.from === getAuthUserLogin()) {
      message.messageOptionsContainer?.removeClass('hide');
    } else {
      return;
    }
  }

  private async editSelectedMessage(): Promise<void> {
    const messageId = this.selectedMessage?.messageId;
    let text = '';
    const textarea = this.newMessageInput?.getView();
    if (textarea instanceof HTMLTextAreaElement) {
      text = textarea.value;

      if (messageId && text != '') {
        await messageTextEditing(messageId, text);
        textarea.value = '';
        this.selectedMessage = null;
      }
    }
  }

  private scrollMessagesToBottom(): void {
    const container = this.messagesContainer?.getView();
    if (container instanceof HTMLElement) {
      container.scrollTop = container.scrollHeight;
    }
  }

  public updateUserStatus(login: string, isActive: boolean): void {
    const userView = this.companionNameElement?.getView().textContent === login;
    if (userView) {
      this.currentCompanionStatus?.setStatus(isActive);
    }
  }
}
export default DialogueView;