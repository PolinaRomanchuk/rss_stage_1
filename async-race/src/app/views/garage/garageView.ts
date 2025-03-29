import BaseView from '../baseView';
import ConfigsView from './configs/configsView';

class GarageView extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['garage-container'],
    });
    const configs = new ConfigsView();
    this.appendChildren([configs]);
  }
}

export default GarageView;
