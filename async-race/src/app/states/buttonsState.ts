import RaceState from './raceState';

export function manageDisabledInRace(elements: (HTMLButtonElement | HTMLInputElement)[], isMustBeDisabled?: boolean): void {
  const raceState = RaceState.getInstance();

  elements.forEach((element) => {
    const wasInitiallyDisabled = element.dataset.initiallyDisabled === 'true';
    if (isMustBeDisabled && wasInitiallyDisabled) {
      return;
    }
    if (!element.dataset.initiallyDisabled) {
      element.dataset.initiallyDisabled = String(element.disabled);
    }

    element.disabled = raceState.isRaceInProgress();
  });
}

export function updateRaceBtn(element: HTMLButtonElement): void {
  const raceState = RaceState.getInstance();
  element.disabled = raceState.isRaceInFinish() || raceState.isRaceInProgress();
}

export function updateResetBtn(element: HTMLButtonElement): void {
  const raceState = RaceState.getInstance();
  element.disabled = !raceState.isRaceInFinish();
}

export function updateRestartBtn(element: HTMLButtonElement): void {
  const raceState = RaceState.getInstance();
  element.disabled = !raceState.isRaceInFinish();
}

export function updateStartBtn(element: HTMLButtonElement): void {
  const raceState = RaceState.getInstance();
  element.disabled = raceState.isRaceInProgress() || raceState.isRaceInFinish();
}
