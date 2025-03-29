import BaseView from '../../../baseView';
import CarSvg from './carSvg';
import DeleteBtn from './deleteBtn';
import RestartBtn from './restartBtn';
import SelectBtn from './selectBtn';
import StartBtn from './startBtn';
import FinishImg from '../../../../../assets/img/finish.png';
import '../car/car.css';

class CarView extends BaseView {
  private carNameElement: BaseView | null = null;
  private carSvgElement: CarSvg | null = null;

  constructor(data?: { name: string; color: string; id: number }) {
    super({ tag: 'div', classNames: ['car-container'] });
    this.renderCar(data);
  }

  public renderCar(data?: { name: string; color: string; id: number }) {
    const selectBtn = new SelectBtn();
    const deleteBtn = new DeleteBtn();
    if (data) {
      this.initializeCar(data.name, data.color);
    } else {
      this.setCarName('Tesla');
    }

    const carControlContainer = this.createCarControlContainer();
    const carPathContainer = this.createCarPathContainer();
    this.appendChildren([
      selectBtn,
      deleteBtn,
      this.carNameElement,
      carControlContainer,
      carPathContainer,
    ]);
  }

  private createCarControlContainer(): BaseView {
    const carControlContainer = new BaseView({
      tag: 'div',
      classNames: ['car-control-container'],
    });
    const startCar = new StartBtn();
    const restartCar = new RestartBtn();
    carControlContainer.appendChildren([startCar, restartCar]);
    return carControlContainer;
  }

  private createCarPathContainer(): BaseView {
    const carPathContainer = new BaseView({
      tag: 'div',
      classNames: ['car-path-container'],
    });
    const finish = this.createFinishImage();

    let car = this.carSvgElement;
    if (!car) {
      car = new CarSvg();
    }
    carPathContainer.appendChildren([car, finish]);
    return carPathContainer;
  }

  private createFinishImage() {
    const finish = new BaseView({
      tag: 'img',
      classNames: ['finish-img'],
    }).getView();
    if (finish instanceof HTMLImageElement) {
      finish.src = FinishImg;
    }
    return finish;
  }

  private initializeCar(name: string, color: string): void {
    if (this.carSvgElement) {
      this.carSvgElement.setCarColor(color);
    } else {
      const carImg = new CarSvg();
      this.carSvgElement = carImg;
      carImg.setCarColor(color);
    }
    this.setCarName(name);
  }

  public setCarName(name: string): void {
    if (this.carNameElement) {
      this.carNameElement.setTextContent(name);
    } else {
      this.carNameElement = new BaseView({
        tag: 'span',
        classNames: ['car-name'],
        textContent: name,
      });
    }
  }
}
export default CarView;
