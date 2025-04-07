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
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(Svg, 'image/svg+xml');
    const svgEl = svgDoc.documentElement;
    if (svgEl instanceof SVGSVGElement) {
      this.svgElement = svgEl;
      this.getView().appendChild(svgEl);
    }
  }

  public setCarColor(color: string): void {
    if (!this.svgElement) return;

    this.svgElement.querySelectorAll('path').forEach((path) => {
      path.style.fill = color;
    });
  }
}
export default CarSvg;
