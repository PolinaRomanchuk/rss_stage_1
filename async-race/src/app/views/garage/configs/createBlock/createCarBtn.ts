import BaseView from '../../../baseView';
import CarsListView from '../../carsList/carsListView';
import SetCarColorInput from '../setCarColorInput';
import SetCarNameInput from '../setCarNameInput';
import { createCar } from '../../../../API/garage';

class CreateCarBtn extends BaseView {
  constructor(
    carsList: CarsListView,
    nameInput: SetCarNameInput,
    colorInput: SetCarColorInput,
  ) {
    super({
      tag: 'button',
      classNames: ['create-car-button'],
      textContent: 'create',
      callback: () => this.createCar(carsList, nameInput, colorInput),
    });
  }

  public async createCar(
    carsList: CarsListView,
    nameInput: SetCarNameInput,
    colorInput: SetCarColorInput,
  ) {
    const name = nameInput.getValue();
    const color = colorInput.getValue();
    const car = { name, color };
    try {
      const newCar = await createCar({ name, color });

      await carsList.getCars();
    } catch (error) {
      console.error('Error');
    }
  }
}
export default CreateCarBtn;
