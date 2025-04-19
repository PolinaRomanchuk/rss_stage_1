import BaseView from '../../baseView';
import StatusDelivered from '../../../../assets/img/status-sent.png';
import StatusRead from '../../../../assets/img/status-read.png';
import Edit from '../../../../assets/img/edit.png';
import { Message } from '../../../../types/types';
import { getAuthUserLogin } from '../../../states/authState';
import Delete from '../../../../assets/img/trash-can.png';
import '../../../views/chatView/chat.css';

class MessageView extends BaseView {
  public contentContainer: BaseView;
  private statusIcon: HTMLImageElement | null = null;
  public message: Message;
  public messageId: string;
  public messageOptionsContainer: BaseView | null = null;
  public editStatusContainer: BaseView | null = null;
  private messageSendStatusContainer: BaseView | null = null;

  public unreadMarker: BaseView | null = null;

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
    const messageBodyContainer = new BaseView({ tag: 'div', classNames: ['message-body-container'] });
    const messageText = this.renderMessageText(message.text);
    const messageDataContainer = this.renderMessageDataContainer();
    const messageOptionsContainer = this.renderMessageOptions(onEdit, onDelete);
    messageBodyContainer.appendChildren([messageText, messageDataContainer]);
    this.checkEditStatus();
    this.contentContainer.appendChildren([name, messageBodyContainer, messageOptionsContainer]);
  }

  private renderMessageOptions(onEdit: (message: MessageView) => void, onDelete: (message: MessageView) => void): BaseView {
    const messageOptionsContainer = new BaseView({ tag: 'div', classNames: ['message-options-container'] });
    const editIconContainer = this.renderEditIcon(onEdit);
    const deleteIconContainer = this.renderDeleteIcon(onDelete);
    this.messageOptionsContainer = messageOptionsContainer;
    this.messageOptionsContainer.addClass('hide');
    messageOptionsContainer.appendChildren([editIconContainer, deleteIconContainer]);
    return messageOptionsContainer;
  }

  private renderMessageDataContainer(): BaseView {
    const messageDataContainer = new BaseView({ tag: 'div', classNames: ['message-data-container'] });
    const messageData = this.renderMessageData(this.message);
    messageDataContainer.append(messageData);
    this.editStatusContainer = messageDataContainer;
    return messageDataContainer;
  }

  private renderMessageData(message: Message): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['message-data'] });
    const status = this.renderMessageSendStatus(this.getMessageStatus());
    const datetime = this.getDate(message.datetime);
    const date = new BaseView({ tag: 'div', classNames: ['message-date'], textContent: `${datetime}` });
    container.appendChildren([date, status]);
    return container;
  }

  private renderDeleteIcon(onDelete: (message: MessageView) => void): BaseView {
    const deleteIconContainer = new BaseView({ tag: 'div', classNames: ['delete-icon-container'] });
    const icon = new BaseView({ tag: 'img', classNames: ['delete-icon'], callback: () => onDelete(this) });
    const iconElement = icon.getView();

    if (iconElement instanceof HTMLImageElement) {
      iconElement.src = Delete;
      iconElement.alt = 'delete';
    }

    deleteIconContainer.appendChildren([icon]);
    return deleteIconContainer;
  }

  private getDate(date: number): string {
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

  private renderMessageSendStatus(messageStatus: 'sent' | 'delivered' | 'read'): BaseView {
    const container = new BaseView({ tag: 'div', classNames: ['message-send-status-container'] });
    if (this.message.from !== getAuthUserLogin()) {
      return container;
    }
    this.messageSendStatusContainer = container;
    if (messageStatus === 'sent') {
      return container;
    }
    const icon = this.renderSendStatusIcon(messageStatus);

    container.appendChildren([icon]);
    return container;
  }

  private renderSendStatusIcon(messageStatus: 'sent' | 'delivered' | 'read'): BaseView {
    const icon = new BaseView({ tag: 'img', classNames: ['message-status-icon'] });

    const iconElement = icon.getView();

    if (iconElement instanceof HTMLImageElement) {
      iconElement.alt = messageStatus === 'read' ? 'status-read' : 'status-delivered';
      iconElement.src = messageStatus === 'read' ? StatusRead : StatusDelivered;
      this.statusIcon = iconElement;
    }
    return icon;
  }

  private renderEditIcon(onEdit: (message: MessageView) => void): BaseView {
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

  public setSendStatus(status: 'sent' | 'delivered' | 'read'): void {
    if (this.message.from !== getAuthUserLogin()) {
      return;
    }

    if (status === 'sent') {
      if (this.statusIcon) {
        this.statusIcon.remove();
        this.statusIcon = null;
      }
      return;
    }

    if (status === 'delivered') {
      if (!this.statusIcon) {
        const icon = new BaseView({ tag: 'img', classNames: ['message-status-icon'] });
        const iconElement = icon.getView();

        if (iconElement instanceof HTMLImageElement) {
          iconElement.alt = 'status-delivered';
          iconElement.src = StatusDelivered;
          this.statusIcon = iconElement;
          this.messageSendStatusContainer?.append(icon);
        }
      } else {
        this.statusIcon.src = StatusDelivered;
        this.statusIcon.alt = 'status-delivered';
      }

    }

    if (status === 'read' && this.statusIcon) {
      this.statusIcon.src = StatusRead;
      this.statusIcon.alt = 'status-read';
    }
  }

  public showUnreadMarker(parent: HTMLElement): void {
    if (this.unreadMarker) {
      this.unreadMarker.removeView();
    }
    const unreadMarker = new BaseView({
      tag: 'div',
      classNames: ['unread-marker'],
    });
    this.unreadMarker = unreadMarker;

    parent.insertBefore(unreadMarker.getView(), this.contentContainer.getView());
  }

  public setEditStatus(status: 'edit'): void {
    const container = new BaseView({ tag: 'div', classNames: ['edited-indicator'] });
    const text = new BaseView({ tag: 'div', classNames: ['edit-status-text'], textContent: status });
    container.append(text);
    this.editStatusContainer?.append(container);
  }

  private checkEditStatus(): void {
    if (this.message.status.isEdited) {
      this.setEditStatus('edit');
    }
  }
}

export default MessageView;