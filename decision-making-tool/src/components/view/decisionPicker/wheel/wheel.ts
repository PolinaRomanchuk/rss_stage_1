import BaseView from '../../baseView';
import '../wheel/wheel.css';

class Wheel extends BaseView {
  private options: { name: string; weight: number }[];
  private ctx: CanvasRenderingContext2D | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private rotationAngle = 0;
  private isSpinning = false;
  private colors: string[];
  private centerColor: string;

  constructor(options: { name: string; weight: number }[]) {
    super({
      tag: 'canvas',
      classNames: ['canvas'],
    });

    this.options = this.loadOptions();
    this.colors = this.options.map(() => this.getColor());
    this.centerColor = this.getColor();
    this.initializeCanvas();
  }

  private loadOptions(): { name: string; weight: number }[] {
    try {
      const data = sessionStorage.getItem('options');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading options:', e);
      return [];
    }
  }

  private initializeCanvas(): void {
    const baseElement = this.getBaseElement();
    if (baseElement instanceof HTMLCanvasElement) {
      this.canvas = baseElement;
      this.canvas.width = 900;
      this.canvas.height = 500;
      this.ctx = this.canvas.getContext('2d');

      if (this.ctx) {
        this.drawWheel();
        this.drawCursor();
      }
    }
  }

  private drawWheel(): void {
    if (!this.ctx || !this.canvas || this.options.length === 0) return;

    const totalWeight = this.options.reduce((sum, opt) => sum + opt.weight, 0);
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 25;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();

    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(this.rotationAngle);
    this.ctx.translate(-centerX, -centerY);

    let startAngle = 0;
    this.options.forEach((option, index) => {
      if (!this.ctx) return;

      const sectorAngle = (option.weight / totalWeight) * 2 * Math.PI;
      const color = this.colors[index];

      this.drawSector(centerX, centerY, radius, startAngle, startAngle + sectorAngle, color);
      this.drawText(centerX, centerY, radius, startAngle, sectorAngle, option.name);

      startAngle += sectorAngle;
    });
    this.drawCenter(radius);
    this.ctx.restore();
    this.drawCursor();
  }

  private drawSector(
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    color: string
  ): void {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);
    this.ctx.arc(cx, cy, radius, startAngle, endAngle);
    this.ctx.closePath();

    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.strokeStyle = '#000';
    this.ctx.stroke();
  }

  private drawText(
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    sectorAngle: number,
    text: string
  ): void {
    if (!this.ctx) return;

    const textAngle = startAngle + sectorAngle / 2;
    const textX = cx + Math.cos(textAngle) * (radius / 2);
    const textY = cy + Math.sin(textAngle) * (radius / 2);

    this.ctx.font = '20px serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = '#000';
    this.ctx.strokeText(text, textX, textY);

    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(text, textX, textY);
  }

  private drawCenter(radiusWheel: number): void {
    if (!this.canvas || !this.ctx) return;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = radiusWheel / 8;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fillStyle = this.centerColor;
    this.ctx.fill();
    this.ctx.strokeStyle = '#000';
    this.ctx.stroke();
  }

  private drawCursor() {
    if (!this.ctx || !this.canvas) return;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 25;

    const topX = centerX;
    const topY = centerY - radius;

    const bottomLeftX = centerX - 20;
    const bottomLeftY = centerY - radius - 20;

    const bottomRightX = centerX + 20;
    const bottomRightY = centerY - radius - 20;

    this.ctx.beginPath();
    this.ctx.moveTo(topX, topY);
    this.ctx.lineTo(bottomLeftX, bottomLeftY);
    this.ctx.lineTo(bottomRightX, bottomRightY);
    this.ctx.closePath();

    this.ctx.fillStyle = 'black';
    this.ctx.fill();
  }

  private getColor(): string {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  }

  public turn(time: number) {
    if (this.isSpinning) return;
    this.isSpinning = true;

    let startTime: number | null = null;
    const duration = time * 1000;
    const totalRotations = 5;
    const maxSpeed = Math.PI * 2 * totalRotations;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const progress = elapsed / duration;
      const easing = 1 - Math.pow(1 - progress, 3);

      this.rotationAngle = maxSpeed * easing;

      this.drawWheel();

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
      }
    };

    requestAnimationFrame(animate);
  }
}

export default Wheel;
