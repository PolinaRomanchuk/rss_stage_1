import { getCar } from '../API/garage';
import { createWinner, getWinner, getWinners, updateWinner } from '../API/winners';
import CarView from '../views/garage/carsList/car/carView';
import WinnerView from '../views/garage/winnerCarView';
import type { WinnerViewData, Winner } from '../../types/types';

export async function fetchWinnersData(page: number, limit: number, sortBy: 'id' | 'wins' | 'time', sortOrder: 'ASC' | 'DESC')
  : Promise<{ winnersData: WinnerViewData[]; totalCount: number; }> {
  const { winners, totalCount } = await getWinners(page, limit, sortBy, sortOrder);

  const winnersData = await Promise.all(
    winners.map(async (winner) => {
      const carData = await getCar(winner.id);
      return {
        id: winner.id,
        name: carData.car.name,
        color: carData.car.color,
        wins: winner.wins,
        time: winner.time,
      };
    })
  );

  return { winnersData, totalCount };
}

export async function handleWinner(carId: number, time: number): Promise<void> {
  const winner = await getWinner(carId);
  if (winner) {
    await updateWinnerTimeAndWins(winner, time);
  } else {
    await createWinner({ id: carId, wins: 1, time });
  }
}

async function updateWinnerTimeAndWins(winner: Winner, time: number): Promise<void> {
  const newWins = winner.wins + 1;
  const newTime = Math.min(winner.time, parseFloat((time / 1000).toFixed(2)));
  await updateWinner(winner.id, { wins: newWins, time: newTime });
  console.log(`Winner id:${winner.id}, winner time:${time}`);
}

export function showWinner(car: CarView): void {
  const name = car.carName;
  if (name) {
    const winner = new WinnerView(name);
    document.body.append(winner.getView());
  }
}

