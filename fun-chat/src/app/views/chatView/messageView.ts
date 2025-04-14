import BaseView from "../baseView";
import StatusSent from '../../../assets/img/status-sent.png';
import Edit from '../../../assets/img/edit.png';
import { Message } from "../../../types/types";


class MessageView extends BaseView {
  private contentContainer: BaseView;
  constructor(message: Message) {
    super({ tag: 'div', classNames: ['message-content'] });
    this.contentContainer = this;
    this.renderContent(message);
  }

  private renderContent(message: Message) {
    const name = this.renderName(message);
    const container = new BaseView({ tag: 'div', classNames: ['text-message-and-configs-container'] });

    const messageText = this.renderMessageText(message.text);
    const conf = this.renderConfigs(message);
    container.appendChildren([messageText, conf]);
    this.contentContainer.appendChildren([name, container]);
  }
  private renderConfigs(message: Message) {
    const container = new BaseView({ tag: 'div', classNames: ['configs-message'] });
    const status = this.renderMessageStatus();
    const datetime = this.getDate(message.datetime);
    const date = new BaseView({ tag: 'div', classNames: ['message-date'], textContent: `${datetime}` });
    const select = this.renderEdit();
    container.appendChildren([date, status, select]);
    return container;
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

  private renderMessageStatus(): BaseView {
    const status = new BaseView({ tag: 'div', classNames: ['message-status-container'] });
    const icon = new BaseView({ tag: 'img', classNames: ['message-status-icon'] });
    const iconElement = icon.getView();

    if (iconElement instanceof HTMLImageElement) {
      iconElement.src = StatusSent;
      iconElement.alt = 'sent';

    }
    status.appendChildren([icon]);
    return status;
  }
  
  private renderEdit(): BaseView {
    const edit = new BaseView({ tag: 'div', classNames: ['edit-icon-container'] });
    edit.changeClass('add', 'hide');
    const icon = new BaseView({ tag: 'img', classNames: ['edit-icon'] });
    const iconElement = icon.getView();

    if (iconElement instanceof HTMLImageElement) {
      iconElement.src = Edit;
      iconElement.alt = 'edit';
    }

    edit.appendChildren([icon]);
    return edit;
  }
}
export default MessageView;