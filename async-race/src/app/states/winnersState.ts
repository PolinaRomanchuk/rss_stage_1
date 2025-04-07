import { WinnersState } from "../../types/types";

const STORAGE_KEY = 'my-winners-state';

const winnersState: WinnersState = {
  currentPage: 1,
  sortBy: 'id',
  sortOrder: 'ASC',
};

export function getWinnersState(): WinnersState {
  return { ...winnersState };
}

export function setCurrentPage(page: number): void {
  winnersState.currentPage = page;
}

export function setSortBy(sortBy: 'id' | 'wins' | 'time'): void {
  winnersState.sortBy = sortBy;
}

export function setSortOrder(sortOrder: 'ASC' | 'DESC'): void {
  winnersState.sortOrder = sortOrder;
}

export function saveWinnersStateToStorage(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(winnersState));
}

export function loadWinnersStateFromStorage(): void {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      winnersState.currentPage = parsed.currentPage || 1;
      winnersState.sortBy = parsed.sortBy || 'id';
      winnersState.sortOrder = parsed.sortOrder || 'ASC';
    } catch (error) {
      console.error('Error', error);
    }
  }
}