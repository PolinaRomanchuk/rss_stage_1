import BaseView from '../../baseView';
import CreateCarView from './createBlock/createCarView';

class ConfigsView extends BaseView {
  constructor() {
    super({ tag: 'div', classNames: ['garage-configs-container'] });
    const inputBlock = new CreateCarView();
    this.appendChildren([inputBlock]);
  }
}
export default ConfigsView;
