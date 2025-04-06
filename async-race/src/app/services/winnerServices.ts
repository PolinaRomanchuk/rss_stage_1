import { createWinner, getWinner, updateWinner } from '../API/winners';
import CarView from '../views/garage/carsList/car/carView';
import WinnerView from '../views/garage/winnerCarView';

export async function handleWinner(carId: number, time: number) {
  const winner = await getWinner(carId);
  console.log(carId, time);
  if (winner) {
    await updateWinnerTimeAndWins(winner, time);
  } else {
    await createWinner({ id: carId, wins: 1, time });
  }
}

async function updateWinnerTimeAndWins(winner: { id: number; wins: number; time: number }, time: number) {
  const newWins = winner.wins + 1;
  const newTime = Math.min(winner.time, parseFloat((time / 1000).toFixed(2)));
  await updateWinner(winner.id, { wins: newWins, time: newTime });
}

export function showWinner(car: CarView) {
  const name = car.carNameElement?.getView().textContent;
  if (name) {
    const winner = new WinnerView(name);
    document.body.append(winner.getView());
  }
}