import BaseView from '../../baseView';
import CreateCarView from './createBlock/createCarView';
import GenerateCarsBtn from './generateCarsBtn';
import RaceBtn from './raceBtn';
import ResetBtn from './resetBtn';
import UpdateCarView from './updateBlock/updateCarView';
import '../configs/configs.css';
import CarsListView from '../carsList/carsListView';
import Pagination from '../../../utils/pagination';
import {
  updateRaceBtn,
  updateResetBtn,
} from '../../../states/buttonsState';
import RaceState from '../../../states/raceState';
import { Car } from '../../../../types/types';

class ConfigsView extends BaseView {
  public updateBlock: UpdateCarView | null = null;

  constructor(carsList: CarsListView, pagination: Pagination<Car>) {
    super({ tag: 'div', classNames: ['garage-configs-container'] });
    const inputBlock = new CreateCarView(pagination);
    const updateBlock = new UpdateCarView(carsList, pagination);

    this.updateBlock = updateBlock;

    const buttonContainer = new BaseView({
      tag: 'div',
      classNames: ['config-buttons=container'],
    });
    const race = new RaceBtn(pagination, carsList);
    const reset = new ResetBtn(carsList);
    const generate = new GenerateCarsBtn(pagination);
    buttonContainer.appendChildren([race, reset, generate]);
    this.appendChildren([inputBlock, updateBlock, buttonContainer]);

    const raceBtn = race.getView();
    const resetBtn = reset.getView();

    const generateBtn = generate.getView();
    if (
      raceBtn instanceof HTMLButtonElement &&
      resetBtn instanceof HTMLButtonElement &&
      generateBtn instanceof HTMLButtonElement
    ) {
      resetBtn.disabled = true;

      RaceState.getInstance().subscribe(() => updateRaceBtn(raceBtn));
      RaceState.getInstance().subscribe(() => updateResetBtn(resetBtn));
    }
  }
}
export default ConfigsView;
