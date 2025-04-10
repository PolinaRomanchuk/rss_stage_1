import BaseView from "../baseView";

class MessageView extends BaseView {
  private contentContainer: BaseView;
  constructor() {
    super({ tag: 'div', classNames: ['message-content'] });
    this.contentContainer = this;
    this.renderContent();
  }

  private renderContent() {
    const name = this.renderName();
    const container = new BaseView({tag: 'div', classNames:['temp-container']})
    
    const messageText = this.renderMessageText();
    const conf = this.renderConfigs();
    container.appendChildren([messageText, conf])
    this.contentContainer.appendChildren([name, container]);
  }
  private renderConfigs() {
    const container = new BaseView({ tag: 'div', classNames: ['configs-message'] });
    const status = new BaseView({ tag: 'div', classNames: ['message-status'], textContent: 'sent' });
    const date = new BaseView({ tag: 'div', classNames: ['message-date'], textContent: '19:50' });
    const select = new BaseView({ tag: 'span', classNames: ['select-icon'], textContent: '!' });
    container.appendChildren([status, date, select]);
    return container;
  }
  private renderMessageText(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['message-text'], textContent: 'Hello. How are you?' });

  }
  private renderName(): BaseView {
    return new BaseView({ tag: 'div', classNames: ['name-in-message'], textContent: 'Test user' });
  }
}
export default MessageView;