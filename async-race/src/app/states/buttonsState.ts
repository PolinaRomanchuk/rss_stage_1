import RaceState from './raceState';

export function manageDisabledInRace(
  elements: (HTMLButtonElement | HTMLInputElement)[],
) {
  const raceState = RaceState.getInstance();
  elements.forEach((element) => {
    element.disabled = raceState.isRaceInProgress();
  });
}

export function updateRaceBtn(element: HTMLButtonElement) {
  const raceState = RaceState.getInstance();
  element.disabled = raceState.isRaceInFinish() || raceState.isRaceInProgress();
}

export function updateResetBtn(element: HTMLButtonElement) {
  const raceState = RaceState.getInstance();
  element.disabled = !(raceState.isRaceInFinish());
}
