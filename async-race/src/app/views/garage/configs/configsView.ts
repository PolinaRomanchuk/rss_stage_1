import BaseView from '../../baseView';
import CreateCarView from './createBlock/createCarView';
import GenerateCarsBtn from './generateCarsBtn';
import RaceBtn from './raceBtn';
import ResetBtn from './resetBtn';
import UpdateCarView from './updateBlock/updateCarView';
import '../configs/configs.css';
import CarsListView from '../carsList/carsListView';
import Pagination from '../../../utils/pagination';

class ConfigsView extends BaseView {
  constructor(carsList: CarsListView, pagination: Pagination<void>) {
    super({ tag: 'div', classNames: ['garage-configs-container'] });
    const inputBlock = new CreateCarView(carsList, pagination);
    const updateBlock = new UpdateCarView(carsList, pagination);
    const buttonContainer = new BaseView({
      tag: 'div',
      classNames: ['config-buttons=container'],
    });
    const race = new RaceBtn(pagination, carsList);
    const reset = new ResetBtn(carsList);
    const generate = new GenerateCarsBtn(carsList, pagination);
    buttonContainer.appendChildren([race, reset, generate]);
    this.appendChildren([inputBlock, updateBlock, buttonContainer]);
  }
}
export default ConfigsView;
