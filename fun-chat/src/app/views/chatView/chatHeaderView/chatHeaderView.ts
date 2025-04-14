import { getAuthUserLogin } from "../../../states/authState";
import BaseView from "../../baseView";
import '../chatHeaderView/chatHeader.css';
import LogOutButton from "./logOutButton";

class ChatHeaderView extends BaseView {
  private container: BaseView;
  constructor() {
    super({ tag: 'div', classNames: ['chat-header-container'] });
    this.container = this;
    this.renderHeader();
  }

  private renderHeader(): void {
    const name = new BaseView({ tag: 'div', classNames: ['chat-name'], textContent: 'Fun chat' });
    const userConfigContainer = this.renderUserConfigContainer();
    this.container.appendChildren([name, userConfigContainer]);
  }

  private renderUserConfigContainer(): BaseView {
    const userConfigContainer = new BaseView({ tag: 'div', classNames: ['header-user-config-container'] });
    const userName = this.renderCurrentUserName();
    const logOutBtn = new LogOutButton();

    userConfigContainer.appendChildren([userName, logOutBtn]);
    return userConfigContainer;
  }

  private renderCurrentUserName(): BaseView {
    const currentUserName = getAuthUserLogin();
    return new BaseView({ tag: 'div', classNames: ['chat-user-name'], textContent: `${currentUserName}` });
  }
}

export default ChatHeaderView;