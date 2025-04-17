import { Message } from "../../../types/types";
import { fetchingMessageHistoryWithUser, messageDeletion, messageReadStatusChange, messageTextEditing, sendingMessageToUser } from "../../API/messageAPI";
import { getAuthUserLogin } from "../../states/authState";
import BaseView from "../baseView";
import ChatUserView from "../chatView/chatUsersView/chatUserView/chatUserView";
import MessageView from "../chatView/messageView";
import OnlineUserStatus from "../components/onlineUserStatus";

class DialogueView extends BaseView {
  private container: BaseView;
  private currentCompanion: ChatUserView | null = null;
  private currentCompanionStatus: OnlineUserStatus | null = null;
  private companionNameElement: BaseView | null = null;
  private messagesContainer: BaseView | null = null;
  private newMessageInput: BaseView | null = null;
  private messageViews: MessageView[] = [];
  private selectedMessage: MessageView | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['dialogue-content'] });
    this.container = this;
    this.renderDialogue();
  }

  private renderDialogue() {
    const companionName = this.renderCompanion();
    const messageContainer = new BaseView({ tag: 'div', classNames: ['message-container'] });
    const messagesWraper = new BaseView({ tag: 'div', classNames: ['messages-wrapper'] });
    this.messagesContainer = messagesWraper;
    messageContainer.appendChildren([messagesWraper]);
    const messageInput = this.renderMessageTextArea();

    const sendBtn = new BaseView({
      tag: 'button', classNames: ['send-button'], textContent: 'Send', callback: this.handleSendButtonClick.bind(this),
    });
    document.addEventListener('keydown', this.enterKeyHandler);

    const conf = new BaseView({ tag: 'div', classNames: ['configur-message-container'] });
    conf.appendChildren([messageInput, sendBtn]);
    this.container.appendChildren([companionName, messageContainer, conf]);
  }

  private enterKeyHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
     this.handleSendButtonClick();
    }
  };
  public removeEventListener() {
    document.removeEventListener('keydown', this.enterKeyHandler);
  }

  private async handleSendButtonClick() {
    if (this.selectedMessage) {
      await this.editSelectedMessage();
    } else {
      await this.send();
    }

    await this.getMessageHistory();
  }

  private async getMessageHistory() {
    const loginCompanion = this.currentCompanion?.name;
    if (loginCompanion) {
      const messages = await fetchingMessageHistoryWithUser(loginCompanion);

      if (this.messagesContainer) {
        this.messagesContainer.removeAllChildren();
        this.messageViews = [];

        if (messages.length === 0) {
          this.messagesContainer.append(this.renderDefaultMessage());
        } else {
          messages.forEach(message => {
            if (this.messagesContainer) {
              const view = new MessageView(message, this.selectMessage.bind(this), this.editMessage.bind(this), this.deleteMessage.bind(this));

              this.messagesContainer.append(view);
              this.messageViews.push(view);
            }
          });
        }
      }
    }
  }

  private findMessageById(messageId: string): MessageView | null {
    return this.messageViews.find(view => view.messageId === messageId) || null;
  }

  private async send() {
    let text = '';
    const textarea = this.newMessageInput?.getView();
    if (textarea instanceof HTMLTextAreaElement) {
      text = textarea.value;
      const login = this.currentCompanion?.name;

      if (login && text != '') {
        await sendingMessageToUser(login, text);
      }
      textarea.value = '';
    }
  }

  private renderMessageTextArea(): BaseView {
    const messageArea = new BaseView({ tag: 'textarea', classNames: ['message-input'] });
    this.newMessageInput = messageArea;
    return messageArea;
  }

  private renderCompanion(): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['companion-name-container'] });
    const companionName = new BaseView({ tag: 'div', classNames: ['friend-name'] });
    this.companionNameElement = companionName;
    const status = new OnlineUserStatus(true);
    status.changeClass('add', 'hide');
    this.currentCompanionStatus = status;
    container.appendChildren([companionName, status]);


    return container;

  }


  public setCompanion(user: ChatUserView): void {
    this.currentCompanion = user;
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

  public addIncomingMessageToView(message: Message) {
    if (this.messagesContainer && this.currentCompanion?.name === message.from) {
      this.messagesContainer.append(new MessageView(message, this.selectMessage.bind(this), this.editMessage.bind(this), this.deleteMessage.bind(this)));
    }
  }

  

  public updateMessageStatus(messageId: string, status: 'sent' | 'delivered' | 'read') {
    console.log(`${messageId} ${status}`);
    const messageView = this.findMessageById(messageId);
    if (messageView) {
      messageView.setStatus(status);
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
  public async editMessage(message: MessageView): Promise<void> {
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
      message.hiddenContainer?.removeClass('hide');
    } else {
      return;
    }
  }

  private async editSelectedMessage() {
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

}
export default DialogueView;