import BaseView from '../../../baseView';
import CarSvg from './carSvg';
import DeleteBtn from './deleteBtn';
import RestartBtn from './restartBtn';
import SelectBtn from './selectBtn';
import StartBtn from './startBtn';
import FinishImg from '../../../../../assets/img/finish.png';
import '../car/car.css';
import RaceState from '../../../../states/raceState';
import {
  updateRestartBtn,
  updateStartBtn,
} from '../../../../states/buttonsState';

class CarView extends BaseView {
  public carNameElement: BaseView | null = null;
  public carSvgElement: CarSvg | null = null;
  public carId: number;
  private isCarRunning: boolean = false;
  private startButton: HTMLButtonElement | null = null;
  private restartButton: HTMLButtonElement | null = null;

  public carName: string = '';
  public carColor: string = '';

  constructor(
    data: { name: string; color: string; id: number },
    onDelete: (car: CarView) => void,
    onSelect: (car: CarView) => void,
  ) {
    super({ tag: 'div', classNames: ['car-container'] });
    this.carId = data.id;
    this.renderCarWithButtons(data, onDelete, onSelect);
  }

  private renderCarWithButtons(
    data: { name: string; color: string; id: number },
    onDelete: (car: CarView) => void,
    onSelect: (car: CarView) => void,
  ): void {
    const selectBtn = new SelectBtn(this, onSelect);
    const deleteBtn = new DeleteBtn(this, onDelete);
    if (data) {
      this.initializeCar(data.name, data.color);
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

    const start = startCar.getView();

    const restart = restartCar.getView();
    if (
      start instanceof HTMLButtonElement &&
      restart instanceof HTMLButtonElement
    ) {
      this.startButton = start;
      this.restartButton = restart;

      start.addEventListener('click', () => this.startCar());
      restart.addEventListener('click', () => this.restartCar());

      RaceState.getInstance().subscribe(() => updateRestartBtn(restart));
      RaceState.getInstance().subscribe(() => updateStartBtn(start));

      restart.disabled = true;
    }

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

  private createFinishImage(): HTMLElement {
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
    this.setCarColor(color);
    this.setCarName(name);
  }

  private setCarColor(color: string): void {
    if (this.carSvgElement) {
      this.carSvgElement.setCarColor(color);
    } else {
      const carImg = new CarSvg();
      this.carSvgElement = carImg;
      carImg.setCarColor(color);
    }
    this.carColor = color;
  }

  private setCarName(name: string): void {
    if (this.carNameElement) {
      this.carNameElement.setTextContent(name);
    } else {
      this.carNameElement = new BaseView({
        tag: 'span',
        classNames: ['car-name'],
        textContent: name,
      });
    }
    this.carName = name;
  }

  private startCar() {
    this.isCarRunning = true;
    this.updateButtons();
  }

  private restartCar() {
    this.isCarRunning = false;
    this.updateButtons();
  }

  private updateButtons() {
    if (this.startButton && this.restartButton) {
      this.startButton.disabled = this.isCarRunning;
      this.restartButton.disabled = !this.isCarRunning;
    }
  }
}
export default CarView;
