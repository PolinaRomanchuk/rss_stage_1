import BaseView from "../baseView";
import StatusSent from '../../../assets/img/status-sent.png';
import StatusRead from '../../../assets/img/status-read.png';
import Edit from '../../../assets/img/edit.png';
import { Message } from "../../../types/types";
import { getAuthUserLogin } from "../../states/authState";
import Delete from '../../../assets/img/trash-can.png';


class MessageView extends BaseView {
  public contentContainer: BaseView;
  private statusIcon: HTMLImageElement | null = null;
  public message: Message;
  public messageId: string;
  public hiddenContainer: BaseView | null = null;



  constructor(message: Message, onSelect: (message: MessageView) => void, onEdit: (message: MessageView) => void, onDelete: (message: MessageView) => void) {
    super({ tag: 'div', classNames: ['message-content'], callback: () => onSelect(this) });
    this.contentContainer = this;
    this.message = message;
    this.messageId = message.id;
    this.renderContent(message, onEdit, onDelete);
  }

  private getMessageStatus(): 'sent' | 'delivered' | 'read' {
    const { isDelivered, isReaded } = this.message.status;
    if (isReaded) {
      return 'read';
    } else if (isDelivered) {
      return 'delivered';
    }
    else {
      return 'sent';
    }
  }

  private renderContent(message: Message, onEdit: (message: MessageView) => void, onDelete: (message: MessageView) => void) {
    const name = this.renderName(message);
    const container = new BaseView({ tag: 'div', classNames: ['text-message-and-configs-container'] });
    const messageText = this.renderMessageText(message.text);
    const conf = this.renderConfigs(message);
    const edit = this.renderEdit(onEdit);
    const delet = this.renderDelete(onDelete);

    const hiddenContainer = new BaseView({ tag: 'div', classNames: ['hidden-config-container'] });
    this.hiddenContainer = hiddenContainer;
    this.hiddenContainer.addClass('hide');
    hiddenContainer.appendChildren([edit, delet]);
    container.appendChildren([messageText, conf]);
    this.contentContainer.appendChildren([name, container, hiddenContainer]);
  }
  private renderConfigs(message: Message) {
    const container = new BaseView({ tag: 'div', classNames: ['configs-message'] });
    const status = this.renderMessageStatus(this.getMessageStatus());
    const datetime = this.getDate(message.datetime);
    const date = new BaseView({ tag: 'div', classNames: ['message-date'], textContent: `${datetime}` });
    container.appendChildren([date, status]);
    return container;
  }
  private renderDelete(onDelete: (message: MessageView) => void): BaseView {
    const delet = new BaseView({ tag: 'div', classNames: ['delete-icon-container'] });

    const icon = new BaseView({ tag: 'img', classNames: ['delete-icon'], callback: () => onDelete(this) });
    const iconElement = icon.getView();

    if (iconElement instanceof HTMLImageElement) {
      iconElement.src = Delete;
      iconElement.alt = 'delete';
    }

    delet.appendChildren([icon]);
    return delet;
  }

  private getDate(date: number) {
    const newDate = new Date(date);
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} `;
  }

  private renderMessageText(text: string): BaseView {
    return new BaseView({ tag: 'div', classNames: ['message-text'], textContent: `${text}` });

  }
  private renderName(message: Message): BaseView {
    return new BaseView({ tag: 'div', classNames: ['name-in-message'], textContent: `${message.from}` });
  }

  private renderMessageStatus(messageStatus: 'sent' | 'delivered' | 'read'): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['message-status-container'] });
    if (messageStatus === 'sent' || this.message.from !== getAuthUserLogin()) {
      return container;
    }

    const icon = new BaseView({ tag: 'img', classNames: ['message-status-icon'] });
    const iconElement = icon.getView();

    if (iconElement instanceof HTMLImageElement) {
      iconElement.alt = messageStatus === 'read' ? 'status-read' : 'status-delivered';
      iconElement.src = messageStatus === 'read' ? StatusRead : StatusSent;
      this.statusIcon = iconElement;
    }

    container.appendChildren([icon]);
    return container;
  }

  private renderEdit(onEdit: (message: MessageView) => void): BaseView {
    const edit = new BaseView({ tag: 'div', classNames: ['edit-icon-container'] });
    const icon = new BaseView({ tag: 'img', classNames: ['edit-icon'], callback: () => onEdit(this) });
    const iconElement = icon.getView();

    if (iconElement instanceof HTMLImageElement) {
      iconElement.src = Edit;
      iconElement.alt = 'edit';
    }

    edit.appendChildren([icon]);
    return edit;
  }

  public setStatus(status: 'sent' | 'delivered' | 'read') {
    if (!this.statusIcon || this.message.from !== getAuthUserLogin()) {
      return;
    }

    if (status === 'delivered') {
      this.statusIcon.src = StatusSent;
      this.statusIcon.alt = 'status-delivered';
    }

    if (status === 'read') {
      this.statusIcon.src = StatusRead;
      this.statusIcon.alt = 'status-read';
    }
  }
}
export default MessageView;