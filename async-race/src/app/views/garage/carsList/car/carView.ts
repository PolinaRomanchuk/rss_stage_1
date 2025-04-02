import BaseView from '../../../baseView';
import CarSvg from './carSvg';
import DeleteBtn from './deleteBtn';
import RestartBtn from './restartBtn';
import SelectBtn from './selectBtn';
import StartBtn from './startBtn';
import FinishImg from '../../../../../assets/img/finish.png';
import '../car/car.css';

class CarView extends BaseView {
  public carNameElement: BaseView | null = null;
  public carSvgElement: CarSvg | null = null;
  public id: number;

  constructor(
    data: { name: string; color: string; id: number },
    onDelete: (car: CarView) => void,
    onSelect: (car: CarView) => void,
  ) {
    super({ tag: 'div', classNames: ['car-container'] });
    this.id = data.id;
    this.renderCar(data, onDelete, onSelect);
  }

  public renderCar(
    data: { name: string; color: string; id: number },
    onDelete: (car: CarView) => void,
    onSelect: (car: CarView) => void,
  ) {
    const selectBtn = new SelectBtn(this, onSelect);
    const deleteBtn = new DeleteBtn(this, onDelete);
    if (data) {
      this.initializeCar(data.name, data.color);
    } else {
      this.setCarName('Tesla');
    }

    const carControlContainer = this.createCarControlContainer(this);
    const carPathContainer = this.createCarPathContainer();
    this.appendChildren([
      selectBtn,
      deleteBtn,
      this.carNameElement,
      carControlContainer,
      carPathContainer,
    ]);
  }

  private createCarControlContainer(car: CarView): BaseView {
    const carControlContainer = new BaseView({
      tag: 'div',
      classNames: ['car-control-container'],
    });
    const startCar = new StartBtn(car);
    const restartCar = new RestartBtn(car);
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
