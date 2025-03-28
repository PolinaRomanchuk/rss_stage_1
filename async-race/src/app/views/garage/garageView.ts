import BaseView from '../baseView';

class GarageView extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['garage-container'],
    });
  }
}

export default GarageView;
