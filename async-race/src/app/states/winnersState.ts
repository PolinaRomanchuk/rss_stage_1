const STORAGE_KEY = 'my-winners-state';

type WinnersState = {
  currentPage: number;
  sortBy: 'id' | 'wins' | 'time';
  sortOrder: 'ASC' | 'DESC';
};

const winnersState: WinnersState = {
  currentPage: 1,
  sortBy: 'id',
  sortOrder: 'ASC',
};

export function getWinnersState(): WinnersState {
  return { ...winnersState };
}

export function setCurrentPage(page: number) {
  winnersState.currentPage = page;
}

export function setSortBy(sortBy: 'id' | 'wins' | 'time') {
  winnersState.sortBy = sortBy;
}

export function setSortOrder(sortOrder: 'ASC' | 'DESC') {
  winnersState.sortOrder = sortOrder;
}



export function saveWinnersStateToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(winnersState));
}

export function loadWinnersStateFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      winnersState.currentPage = parsed.currentPage || 1;
      winnersState.sortBy = parsed.sortBy || 'id';
      winnersState.sortOrder = parsed.sortOrder  || 'ASC';
    } catch (error) {
      console.error('Error', error);
    }
  }
}