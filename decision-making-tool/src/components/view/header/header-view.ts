import '../header/header.css';
import BaseView from '../baseView';

class Header extends BaseView {
  constructor() {
    super({
      tag: 'h1',
      classNames: ['project-name'],
      textContent: 'Decision making tool',
    });
  }
}

export default Header;
