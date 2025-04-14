import BaseView from "../baseView";
import '../chatView/chat.css';


class OnlineUserStatus extends BaseView {
  private circleElement: BaseView | null = null;
  constructor(isActive: boolean) {
    super({ tag: 'div', classNames: ['online-status-container'] });
    this.drawCircle(isActive)
  }

  private drawCircle(isActive: boolean) {
    const circle = new BaseView({ tag: 'span', classNames: ['circle'] });
    this.circleElement = circle;
    this.setStatus(isActive);
    this.append(circle);
  }

  public setStatus(isActive: boolean) {
    if (this.circleElement) {
      if (isActive) {
        this.circleElement.getView().style.backgroundColor = 'green';
      }
      else {
        this.circleElement.getView().style.backgroundColor = 'red';
      }
    }
  }
}
export default OnlineUserStatus;

