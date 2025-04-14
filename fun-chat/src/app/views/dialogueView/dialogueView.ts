import BaseView from "../baseView";
import ChatUserView from "../chatView/chatUsersView/chatUserView/chatUserView";
import OnlineUserStatus from "../components/onlineUserStatus";

class DialogueView extends BaseView {
  private container: BaseView;
  private currentCompanion: ChatUserView | null = null;
  private currentCompanionStatus: OnlineUserStatus | null = null;
  private companionNameElement: BaseView | null = null;

  constructor() {
    super({ tag: 'div', classNames: ['dialogue-content'] });
    this.container = this;
    this.renderDialogue();
  }

  private renderDialogue() {
    const companionName = this.renderCompanion();
    const messageContainer = new BaseView({ tag: 'div', classNames: ['message-container'] });
    const messagesWraper = new BaseView({ tag: 'div', classNames: ['messages-wrapper'] });
    messagesWraper.appendChildren([]);
    messageContainer.appendChildren([messagesWraper]);
    const messageInput = this.renderMessageTextArea();

    const sendBtn = new BaseView({ tag: 'button', classNames: ['send-button'], textContent: 'Send' });
    const conf = new BaseView({ tag: 'div', classNames: ['configur-message-container'] });
    conf.appendChildren([messageInput, sendBtn])
    this.container.appendChildren([companionName, messageContainer, conf]);
  }

  private renderMessageTextArea(): BaseView {
    const messageArea = new BaseView({ tag: 'textarea', classNames: ['message-input'] });
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
    }
  }
}
export default DialogueView;