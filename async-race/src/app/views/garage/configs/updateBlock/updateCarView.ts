import BaseView from '../../../baseView';
import UpdateCarBtn from './updateCarBtn';
import CarsListView from '../../carsList/carsListView';
import InputView from '../../../../utils/inputView';
import Pagination from '../../../../utils/pagination';
import RaceState from '../../../../states/raceState';
import { manageDisabledInRace } from '../../../../states/buttonsState';

class UpdateCarView extends BaseView {
  private buttons: HTMLButtonElement[] = [];
  private inputs: HTMLInputElement[] = [];
  private carsList: CarsListView | null = null;

  public nameInput : HTMLInputElement | null = null;
  public colorInput : HTMLInputElement | null = null;

  constructor(
    carsList: CarsListView,
    pagination: Pagination<{ name: string; color: string; id: number }>,
  ) {
    super({
      tag: 'div',
      classNames: ['update-car-container'],
    });
    const name = this.drawNameInput();
    const color = this.drawColorInput();
    const button = new UpdateCarBtn(carsList, name, color, pagination);
    this.appendChildren([name, color, button]);
    this.carsList = carsList;

    const nameInput = name.getView();
    
    const colorInput = color.getView();

    if (
      nameInput instanceof HTMLInputElement &&
      colorInput instanceof HTMLInputElement
    ) {
      this.nameInput = nameInput;
      this.colorInput = colorInput;
      this.inputs.push(nameInput, colorInput);
    }

    const buttonElement = button.getView();
    if (buttonElement instanceof HTMLButtonElement) {
      this.buttons.push(buttonElement);
    }

    if (this.buttons && this.inputs) {
      RaceState.getInstance().subscribe(() =>
        manageDisabledInRace(this.buttons),
      );
      RaceState.getInstance().subscribe(() =>
        manageDisabledInRace(this.inputs),
      );
    }
  }

  private drawNameInput(): InputView {
    const name = new InputView();
    name.setType('text');
    name.addClass(['car-name-input']);
    name.getView().textContent = this.getName();
    return name;
  }

  private drawColorInput(): InputView {
    const color = new InputView();
    color.setType('color');
    color.addClass(['car-color-input']);
    return color;
  }

  private getData(): { carName: string; carColor: string } {
    const name = this.carsList?.selectedCar?.carName || '';
    const color = this.carsList?.selectedCar?.carColor || '';
    return { carName: name, carColor: color };
  }
  private getName(): string {
    return this.carsList?.selectedCar?.carName || '';
  }
}
export default UpdateCarView;
