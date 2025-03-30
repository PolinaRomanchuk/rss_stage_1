import { updateCar } from '../../../../API/garage';
import InputView from '../../../../utils/inputView';
import BaseView from '../../../baseView';
import CarsListView from '../../carsList/carsListView';

class UpdateCarBtn extends BaseView {
  constructor(
    carsList: CarsListView,
    nameInput: InputView,
    colorInput: InputView,
  ) {
    super({
      tag: 'button',
      classNames: ['update-car-button'],
      textContent: 'update',
      callback: () => this.updateCar(carsList, nameInput, colorInput),
    });
  }
  public async updateCar(
    carsList: CarsListView,
    nameInput: InputView,
    colorInput: InputView,
  ) {
    const name = nameInput.getValue();
    const color = colorInput.getValue();

    try {
      const selCar = carsList.selectedCar;
      if (selCar) await updateCar(selCar.id, { name, color });

      await carsList.getCars(1, 7);
    } catch (error) {
      console.error('Error');
    }
  }
}
export default UpdateCarBtn;
