import BaseView from '../../../baseView';
import CarsListView from '../../carsList/carsListView';
import { createCar } from '../../../../API/garage';
import InputView from '../../../../utils/inputView';

class CreateCarBtn extends BaseView {
  constructor(
    carsList: CarsListView,
    nameInput: InputView,
    colorInput: InputView,
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
    nameInput: InputView,
    colorInput: InputView,
  ) {
    const name = nameInput.getValue();
    const color = colorInput.getValue();
    const car = { name, color };
    try {
      const newCar = await createCar({ name, color });

      await carsList.getCars(1, 7);
    } catch (error) {
      console.error('Error');
    }
  }
}
export default CreateCarBtn;
