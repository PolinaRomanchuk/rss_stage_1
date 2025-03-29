import BaseView from '../../baseView';
import CreateCarView from './createBlock/createCarView';
import UpdateCarView from './updateBlock/updateCarView';

class ConfigsView extends BaseView {
  constructor() {
    super({ tag: 'div', classNames: ['garage-configs-container'] });
    const inputBlock = new CreateCarView();
    const updateBlock = new UpdateCarView();
    this.appendChildren([inputBlock, updateBlock]);
  }
}
export default ConfigsView;
