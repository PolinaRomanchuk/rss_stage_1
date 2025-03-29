import BaseView from '../baseView';

class CarsCounterView extends BaseView {
  constructor() {
    super({ tag: 'span', classNames: ['cars-counter'], textContent: '0 cars' });
  }
}

export default CarsCounterView;
