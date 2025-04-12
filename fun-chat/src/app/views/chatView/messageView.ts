import BaseView from "../baseView";
import StatusSent from '../../../assets/img/status-sent.png';
import Edit from '../../../assets/img/edit.png';


class MessageView extends BaseView {
  private contentContainer: BaseView;
  constructor() {
    super({ tag: 'div', classNames: ['message-content'] });
    this.contentContainer = this;
    this.renderContent();
  }

  private renderContent() {
    const name = this.renderName();
    const container = new BaseView({ tag: 'div', classNames: ['temp-container'] })

    const messageText = this.renderMessageText();
    const conf = this.renderConfigs();
    container.appendChildren([messageText, conf])
    this.contentContainer.appendChildren([name, container]);
  }
  private renderConfigs() {
    const container = new BaseView({ tag: 'div', classNames: ['configs-message'] });
    const status = this.renderMessageStatus();
    const date = new BaseView({ tag: 'div', classNames: ['message-date'], textContent: '19:50' });
    const select = this.renderEdit();
    container.appendChildren([status, date, select]);
    return container;
  }
  private renderMessageText(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['message-text'], textContent: 'Hello. How are you?' });

  }
  private renderName(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['name-in-message'], textContent: 'Test user' });
  }

  private renderMessageStatus(): BaseView {
    const status = new BaseView({ tag: 'div', classNames: ['message-status-container'] });
    const icon = new BaseView({ tag: 'img', classNames: ['message-status-icon'] });
    const iconElement = icon.getView()

    if (iconElement instanceof HTMLImageElement) {
      iconElement.src = StatusSent;
      iconElement.alt = 'sent';

    }
    status.appendChildren([icon]);
    return status;
  }
  private renderEdit(): BaseView {
    const edit = new BaseView({ tag: 'div', classNames: ['edit-icon-container'] });
    const icon = new BaseView({ tag: 'img', classNames: ['edit-icon'] });
    const iconElement = icon.getView()

    if (iconElement instanceof HTMLImageElement) {
      iconElement.src = Edit;
      iconElement.alt = 'edit';

    }
    edit.appendChildren([icon]);
    return edit;
  }
}
export default MessageView;