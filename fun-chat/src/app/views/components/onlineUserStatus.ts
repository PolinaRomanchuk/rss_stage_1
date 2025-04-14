import BaseView from "../baseView";
import '../chatView/chat.css';


class OnlineUserStatus extends BaseView {
  constructor(isActive: boolean) {
    super({ tag: 'div', classNames: ['online-status-container'] });

    this.drawCircle(isActive)
  }

  private drawCircle(isActive: boolean) {
    const circle = new BaseView({ tag: 'span', classNames: ['circle'] });
    if (isActive) {
      circle.getView().style.backgroundColor = 'green';
    }
    else {
      circle.getView().style.backgroundColor = 'red';
    }
    this.append(circle);
  }
}
export default OnlineUserStatus;

