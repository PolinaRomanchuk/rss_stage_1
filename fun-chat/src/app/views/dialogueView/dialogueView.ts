import { fetchingMessageHistoryWithUser, sendingMessageToUser } from "../../API/messageAPI";
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
      tag: 'button', classNames: ['send-button'], textContent: 'Send',
      callback: () => {
        this.send();
        this.getMessageHistory();
      }
    });
    const conf = new BaseView({ tag: 'div', classNames: ['configur-message-container'] });
    conf.appendChildren([messageInput, sendBtn]);
    this.container.appendChildren([companionName, messageContainer, conf]);
  }
  private async getMessageHistory() {
    const login = this.currentCompanion?.name;
    if (login) {
      const messages = await fetchingMessageHistoryWithUser(login);

      if (this.messagesContainer) {
        this.messagesContainer.removeAllChildren();

        if (messages.length === 0) {
          this.messagesContainer.append(this.renderDefaultMessage());
        } else {
          messages.forEach(message => {
            if (this.messagesContainer) {
              this.messagesContainer.append(new MessageView(message));
            }
          });
        }
      }
    }
  }

  private async send() {
    let text = '';
    const textarea = this.newMessageInput?.getView();
    if (textarea instanceof HTMLTextAreaElement) {
      text = textarea.value;

      const login = this.currentCompanion?.name;
      if (login) {
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
      this.getMessageHistory();
    }
  }

  private renderDefaultMessage(): BaseView {
    const defaultMessage = new BaseView({ tag: 'div', classNames: ['say-hi-message'], textContent: 'Say hi to start talking' });
    return defaultMessage;
  }
}
export default DialogueView;