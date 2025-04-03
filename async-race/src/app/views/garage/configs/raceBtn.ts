import { startRace } from '../../../services/engineServices';
import RaceState from '../../../states/raceState';
import Pagination from '../../../utils/pagination';
import BaseView from '../../baseView';
import CarsListView from '../carsList/carsListView';

class RaceBtn extends BaseView {
  constructor(
    pagination: Pagination<{ name: string; color: string; id: number }>,
    carsListView: CarsListView,
  ) {
    super({
      tag: 'button',
      classNames: ['race-button'],
      textContent: 'Race',
      callback: async () => {
        const raceState = RaceState.getInstance();
        if (raceState.isRaceInProgress()) return;

        raceState.startRace();
        await startRace(pagination, carsListView);
        raceState.endRace();
      },
    });
  }
}
export default RaceBtn;
