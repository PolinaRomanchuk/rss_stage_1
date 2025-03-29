import BaseView from '../../../baseView';
import Svg from '../../../../../assets/img/car.svg';

class CarSvg extends BaseView {
  constructor() {
    super({
      tag: 'div',
      classNames: ['car-svg-container'],
    });

    this.getView().innerHTML = Svg;
  }
}
export default CarSvg;
