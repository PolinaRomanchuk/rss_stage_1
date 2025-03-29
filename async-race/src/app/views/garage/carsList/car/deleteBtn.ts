import BaseView from "../../../baseView";

class DeleteBtn extends BaseView {
  constructor() {
    super({
      tag: 'button',
      classNames: ['delete-button'],
      textContent: 'Delete',
    });
  }
}
export default DeleteBtn;