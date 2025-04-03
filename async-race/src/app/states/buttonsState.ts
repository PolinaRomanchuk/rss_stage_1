import RaceState from './raceState';

export function updateUIElements(
  elements: (HTMLButtonElement | HTMLInputElement)[],
) {
  const raceState = RaceState.getInstance();
  elements.forEach((element) => {
    element.disabled = raceState.isRaceInProgress();
  });
}
