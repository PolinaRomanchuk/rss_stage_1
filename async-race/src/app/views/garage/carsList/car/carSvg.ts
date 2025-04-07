import BaseView from '../../../baseView';
import Svg from '../../../../../assets/img/car.svg';

class CarSvg extends BaseView {
  private svgElement: SVGElement | null = null;

  constructor() {
    super({
      tag: 'div',
      classNames: ['car-svg-container'],
    });

    this.renderSvg();
  }
  private renderSvg(): void {
    this.getView().innerHTML = Svg;
    this.svgElement = this.getView().querySelector('svg');
  }

  public setCarColor(color: string): void {
    if (!this.svgElement) return;

    this.svgElement.querySelectorAll('path').forEach((path) => {
      path.style.fill = color;
    });
  }
}
export default CarSvg;
