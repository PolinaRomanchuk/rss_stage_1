import BaseView from '../../baseView';
import '../wheel/wheel.css';

class Wheel extends BaseView {
  private circle: Path2D = new Path2D();
  constructor() {
    super({
      tag: 'canvas',
      classNames: ['canvas'],
    });
    const canvas = this.getBaseElement();
    if (canvas instanceof HTMLCanvasElement) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.circle = this.createCircle(canvas.width, canvas.height);
        this.drawCircle(ctx);
        this.createCursor(canvas.width, canvas.height, ctx);
      }
    }
  }
  private createCircle(width: number, height: number): Path2D {
    const circle = new Path2D();
    const radius = 50;
    const centerX = width / 2;
    const centerY = height / 2;

    circle.arc(centerX, centerY, radius, 0, 2 * Math.PI);

    return circle;
  }
  private drawCircle(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'blue';
    ctx.fill(this.circle);
  }

  private createCursor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    const radius = 50;
    const centerX = width / 2;
    const centerY = height / 2;

    const topX = centerX;
    const topY = centerY - radius;

    const bottomLeftX = centerX - 10;
    const bottomLeftY = centerY - radius - 10;

    const bottomRightX = centerX + 10;
    const bottomRightY = centerY - radius - 10;

    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(bottomLeftX, bottomLeftY);
    ctx.lineTo(bottomRightX, bottomRightY);
    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.fill();
  }
}

export default Wheel;
