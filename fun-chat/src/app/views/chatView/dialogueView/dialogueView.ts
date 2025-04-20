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

  private isOpenOptions: boolean = false;
  private isEditing: boolean = false;

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

    const sendMessageContainer = new BaseView({ tag: 'div', classNames: ['send-message-options-container'] });
    sendMessageContainer.appendChildren([messageInput, sendBtn]);
    this.appendChildren([companionName, messageContainer, sendMessageContainer]);

    this.renderStartDialogueMessage();

    this.messagesWraper?.getView().addEventListener('click', () => {
      this.removeUnreadMarker();
    });
  }

  private renderStartDialogueMessage(): void {
    if (!this.currentCompanion) {
      const defaultMessage = new BaseView({
        tag: 'div',
        classNames: ['say-hi-message'],
        textContent: 'Select user to start talking'
      });
      this.disableInputAndSendButton();
      this.messagesWraper?.append(defaultMessage);
    }
  }

  private renderSayHiMessage(): void {
    const defaultMessage = new BaseView({ tag: 'div', classNames: ['say-hi-message'], textContent: 'Say hi to start talking' });
    this.messagesWraper?.append(defaultMessage);
  }

  private renderMessageTextArea(): BaseView {
    const messageArea = new BaseView({ tag: 'textarea', classNames: ['message-input'] });
    this.newMessageInput = messageArea;
    return messageArea;
  }

  private renderMessages(messages: Message[]): void {
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

  private renderCompanion(): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['companion-name-container'] });
    const companionName = new BaseView({ tag: 'div', classNames: ['friend-name-in-dialogue'] });
    this.companionNameElement = companionName;
    const status = new OnlineUserStatus(true);
    status.addClass('hide');
    this.currentCompanionStatus = status;
    container.appendChildren([companionName, status]);
    return container;
  }

  private disableInputAndSendButton(): void {
    this.sendButton?.disableButton();
    this.newMessageInput?.getView().setAttribute('disabled', 'true');
  }

  private enableInputAndSendButton(): void {
    this.sendButton?.enableButton();
    this.newMessageInput?.getView().removeAttribute('disabled');
  }

  private async handleSendButtonClick(): Promise<void> {
    if (this.selectedMessage && this.isEditing) {
      await this.editSelectedMessage();
    } else {
      await this.sendMessage();
    }
    this.removeUnreadMarker();
    await this.getMessageHistory();
  }

  private async sendMessage(): Promise<void> {
    let text = '';
    const textarea = this.newMessageInput?.getView();
    if (textarea instanceof HTMLTextAreaElement) {
      text = textarea.value;
      const login = this.currentCompanion?.name;

      if (login && text != '') {
        await sendingMessageToUser(login, text);
      }
      textarea.value = '';
      this.scrollToBottom();
    }
  }

  public async deleteMessage(message: MessageView): Promise<void> {
    this.selectedMessage = message;
    if (this.selectedMessage?.message.from === getAuthUserLogin()) {
      await messageDeletion(message.messageId);
      message.contentContainer.removeView();
      this.selectedMessage = null;
      this.isOpenOptions = false;
      this.enableInputAndSendButton();
      this.sendButton?.addEnterKeyListener();
    } else {
      return;
    }
  }

  public async setTextAreaByTextFromMessageToEdit(message: MessageView): Promise<void> {
    this.selectedMessage = message;
    if (this.selectedMessage?.message.from === getAuthUserLogin()) {
      this.isEditing = true;
      const textarea = this.newMessageInput?.getView();
      if (textarea instanceof HTMLTextAreaElement) {
        textarea.value = this.selectedMessage.message.text;
      }
      this.sendButton?.addEnterKeyListener();
      this.enableInputAndSendButton();
    } else {
      return;
    }
  }

  public async selectMessage(message: MessageView): Promise<void> {
    if (this.selectedMessage === message && !this.isEditing) {
      message.messageOptionsContainer?.addClass('hide');
      message.getView().style.backgroundColor = '';
      this.selectedMessage = null;
      this.isOpenOptions = false;
      this.isEditing = false;
      this.enableInputAndSendButton();
      this.sendButton?.addEnterKeyListener();
      const textarea = this.newMessageInput?.getView();
      if (textarea instanceof HTMLTextAreaElement) {
        textarea.value = '';
      }
      return;
    }

    if (this.selectedMessage != null) {
      return;
    }

    this.selectedMessage = message;
    this.isOpenOptions = true;
    if (this.selectedMessage?.message.from === getAuthUserLogin()) {
      message.messageOptionsContainer?.removeClass('hide');
      this.selectedMessage.getView().style.backgroundColor = 'var(--color-btn-background-inactive)';
      if (!this.isEditing) {
        this.disableInputAndSendButton();
        this.sendButton?.removeKeyHandler();
      }
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
        this.isEditing = false;
        this.isOpenOptions = false;
      }
    }
  }

  private async getMessageHistory(): Promise<void> {
    const loginCompanion = this.currentCompanion?.name;
    if (!loginCompanion || !this.messagesWraper) return;

    const messages = await fetchingMessageHistoryWithUser(loginCompanion);
    this.messagesWraper.removeAllChildren();
    this.messageViews = [];

    if (messages.length === 0) {
      this.renderSayHiMessage();
    } else {
      this.renderMessages(messages);
    }

    if (this.firstUnreadMessageView) {
      this.scrollToMessage(this.firstUnreadMessageView);
    } else {
      this.scrollToBottom();
    }
  }

  private scrollToMessage(messageView: MessageView): void {
    const messageElement = messageView.getView();
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  private scrollToBottom(): void {
    const container = this.messagesContainer?.getView();
    if (container instanceof HTMLElement) {
      container.scrollTop = container.scrollHeight;
    }
  }

  private findMessageViewById(messageId: string): MessageView | null {
    return this.messageViews.find(view => view.messageId === messageId) || null;
  }

  private removeUnreadMarker(): void {
    if (this.firstUnreadMessageView?.unreadMarker) {
      this.firstUnreadMessageView.unreadMarker.removeView();
      this.firstUnreadMessageView.unreadMarker = null;
      this.firstUnreadMessageView = null;
    }
  }

  public addIncomingMessageToView(message: Message): void {
    if (this.messagesWraper && this.currentCompanion?.name === message.from) {
      this.messagesWraper.append(new MessageView(message, this.selectMessage.bind(this), this.setTextAreaByTextFromMessageToEdit.bind(this), this.deleteMessage.bind(this)));
      this.scrollToBottom();
    }
  }

  public setCompanion(user: ChatUserView): void {
    this.currentCompanion = user;
    this.removeUnreadMarker();
    this.isOpenOptions = false;
    this.isEditing = false;
    this.selectedMessage = null;
    const element = this.newMessageInput?.getView();
    if (element instanceof HTMLTextAreaElement) {
      element.value = '';
    }

    if (this.companionNameElement && this.currentCompanionStatus) {
      this.companionNameElement.setTextContent(user.name);
      this.currentCompanionStatus.setStatus(user.isActive);
      this.currentCompanionStatus.changeClass('remove', 'hide');
      this.enableInputAndSendButton();

      this.getMessageHistory().then(() => {
        this.messageViews.forEach(msgView => {
          if (msgView.messageId && this.currentCompanion?.name === msgView.message.from) {
            messageReadStatusChange(msgView.messageId);
          }
        });
      });
    }
  }

  public updateUserStatus(login: string, isActive: boolean): void {
    const userView = this.companionNameElement?.getView().textContent === login;
    if (userView) {
      this.currentCompanionStatus?.setStatus(isActive);
    }
  }

  public updateSendMessageStatus(messageId: string, status: 'sent' | 'delivered' | 'read'): void {
    const messageView = this.findMessageViewById(messageId);
    if (messageView) {
      messageView.setSendStatus(status);
    }
  }

  public updateEditMessageStatus(messageId: string, status: 'edit'): void {
    const messageView = this.findMessageViewById(messageId);
    if (messageView) {
      messageView.setEditStatus(status);
    }
  }

  public deleteMessageView(messageId: string): void {
    const messageView = this.findMessageViewById(messageId);
    if (messageView) {
      messageView.removeView();
      this.selectedMessage = null;
    }
  }
}
export default DialogueView;