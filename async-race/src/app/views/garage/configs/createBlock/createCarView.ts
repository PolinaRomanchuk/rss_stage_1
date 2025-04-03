import BaseView from '../../../baseView';
import CreateCarBtn from './createCarBtn';
import CarsListView from '../../carsList/carsListView';
import InputView from '../../../../utils/inputView';
import Pagination from '../../../../utils/pagination';
import RaceState from '../../../../states/raceState';
import { updateUIElements } from '../../../../states/buttonsState';

class CreateCarView extends BaseView {
  private buttons: HTMLButtonElement[] = [];
  private inputs: HTMLInputElement[] = [];

  constructor(
    carsList: CarsListView,
    pagination: Pagination<{ name: string; color: string; id: number }>,
  ) {
    super({ tag: 'div', classNames: ['create-car-container'] });

    const name = this.drawNameInput();
    const color = this.drawColorInput();
    const button = new CreateCarBtn(carsList, name, color, pagination);

    this.appendChildren([name, color, button]);

    const nameInput = name.getView();
    const colorInput = color.getView();

    if (nameInput instanceof HTMLInputElement && colorInput instanceof HTMLInputElement) {
      this.inputs.push(nameInput, colorInput);
    }

    const buttonElement = button.getView();
    if (buttonElement instanceof HTMLButtonElement) {
      this.buttons.push(buttonElement);
    }

    if (this.buttons && this.inputs) {
      RaceState.getInstance().subscribe(() => updateUIElements(this.buttons));
      RaceState.getInstance().subscribe(() => updateUIElements(this.inputs));
    }
  }

  private drawNameInput(): InputView {
    const name = new InputView();
    name.setType('text');
    name.addClass(['car-name-input']);
    return name;
  }

  private drawColorInput(): InputView {
    const color = new InputView();
    color.setType('color');
    color.addClass(['car-color-input']);
    return color;
  }
}
export default CreateCarView;
