import BaseView from '../baseView';
import CarsCounterView from './carsCounterView';
import ConfigsView from './configs/configsView';

class GarageView extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['garage-container'],
    });
    const configs = new ConfigsView();
    const nameView = new BaseView({
      tag: 'div',
      classNames: ['current-view-name'],
      textContent: 'Garage',
    });
    const carsCounter = new CarsCounterView();

    this.appendChildren([configs, nameView, carsCounter]);
  }
}

export default GarageView;
