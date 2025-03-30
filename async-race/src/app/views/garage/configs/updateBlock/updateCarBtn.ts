import { updateCar } from '../../../../API/garage';
import BaseView from '../../../baseView';
import CarsListView from '../../carsList/carsListView';
import SetCarColorInput from '../setCarColorInput';
import SetCarNameInput from '../setCarNameInput';

class UpdateCarBtn extends BaseView {
  constructor(
    carsList: CarsListView,
    nameInput: SetCarNameInput,
    colorInput: SetCarColorInput,
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
    nameInput: SetCarNameInput,
    colorInput: SetCarColorInput,
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
