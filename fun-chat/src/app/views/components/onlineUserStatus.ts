import BaseView from "../baseView";
import '../chatView/chat.css';


class OnlineUserStatus extends BaseView {
  constructor() {
    super({ tag: 'div', classNames: ['online-status-container'] });

    const circle = new BaseView({ tag: 'span', classNames: ['circle'] });
    this.append(circle);
  }
}
export default OnlineUserStatus;

