import BaseView from '../../baseView';
import CreateCarView from './createBlock/createCarView';
import GenerateCarsBtn from './generateCarsBtn';
import RaceBtn from './raceBtn';
import ResetBtn from './resetBtn';
import UpdateCarView from './updateBlock/updateCarView';

class ConfigsView extends BaseView {
  constructor() {
    super({ tag: 'div', classNames: ['garage-configs-container'] });
    const inputBlock = new CreateCarView();
    const updateBlock = new UpdateCarView();
    const buttonContainer = new BaseView({
      tag: 'div',
      classNames: ['config-buttons=container'],
    });
    const race = new RaceBtn();
    const reset = new ResetBtn();
    const generate = new GenerateCarsBtn();
    buttonContainer.appendChildren([race, reset, generate]);
    this.appendChildren([inputBlock, updateBlock, buttonContainer]);
  }
}
export default ConfigsView;
