import BaseView from '../../../baseView';
import CarSvg from './carSvg';
import DeleteBtn from './deleteBtn';
import RestartBtn from './restartBtn';
import SelectBtn from './selectBtn';
import StartBtn from './startBtn';
import FinishImg from '../../../../../assets/img/finish.png';
import '../car/car.css';

class CarView extends BaseView {
  constructor() {
    super({ tag: 'div', classNames: ['car-container'] });
    const selectBtn = new SelectBtn();
    const deleteBtn = new DeleteBtn();
    const carName = new BaseView({
      tag: 'span',
      classNames: ['car-name'],
      textContent: 'Tesla',
    });
    const carControlContainer = new BaseView({
      tag: 'div',
      classNames: ['car-control-container'],
    });
    const startCar = new StartBtn();
    const restartCar = new RestartBtn();
    carControlContainer.appendChildren([startCar, restartCar]);
    const carPathContainer = new BaseView({
      tag: 'div',
      classNames: ['car-path-container'],
    });

    const car = new CarSvg();
    const finish = new BaseView({
      tag: 'img',
      classNames: ['finish-img'],
    }).getView();
    if (finish instanceof Image) {
      finish.src = FinishImg;
    }

    carPathContainer.appendChildren([car, finish]);
    this.appendChildren([
      selectBtn,
      deleteBtn,
      carName,
      carControlContainer,
      carPathContainer,
    ]);
  }
}
export default CarView;
