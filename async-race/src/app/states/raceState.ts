class RaceState {
  private static instance: RaceState;
  private raceInProgress: boolean = false;
  private raceInFinish: boolean = false;
  private subscribers: (() => void)[] = [];

  private constructor() { }

  static getInstance(): RaceState {
    if (!RaceState.instance) {
      RaceState.instance = new RaceState();
    }
    return RaceState.instance;
  }

  startRace() {
    this.raceInProgress = true;
    this.raceInFinish = false;
    this.notifySubscribers();
  }

  endRace() {
    this.raceInProgress = false;
    this.raceInFinish = true;
    this.notifySubscribers();
  }

  refreshRace() {
    this.raceInProgress = false;
    this.raceInFinish = false;
    this.notifySubscribers();
  }

  isRaceInProgress(): boolean {
    return this.raceInProgress;
  }

  isRaceInFinish(): boolean {
    return this.raceInFinish;
  }

  subscribe(callback: () => void) {
    this.subscribers.push(callback);
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback());
  }
}

export default RaceState;
