import type { GarageState } from "../../types/types";
const STORAGE_KEY = 'my-garage-state';

const garageState: GarageState = {
  currentPage: 1,
  inputName: '',
  inputColor: '',
  updateInputName: '',
  updateInputColor: '',
};

export function getGarageState(): GarageState {
  return { ...garageState };
}

export function setCurrentPage(page: number): void {
  garageState.currentPage = page;
}

export function setInputName(name: string): void {
  garageState.inputName = name;
}

export function setInputColor(color: string): void {
  garageState.inputColor = color;
}

export function setGarageInputs(name: string, color: string): void {
  garageState.inputName = name;
  garageState.inputColor = color;
}

export function setUpdateInputs(name: string, color: string): void {
  garageState.updateInputName = name;
  garageState.updateInputColor = color;
}

export function setUpdateInputName(name: string): void {
  garageState.updateInputName = name;
}

export function setUpdateInputColor(color: string): void {
  garageState.updateInputColor = color;
}

export function saveGarageStateToStorage(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(garageState));
}

export function loadGarageStateFromStorage(): void {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      garageState.currentPage = parsed.currentPage || 1;
      garageState.inputName = parsed.inputName || '';
      garageState.inputColor = parsed.inputColor || '';
      garageState.updateInputName = parsed.inputName || '';
      garageState.updateInputColor = parsed.inputColor || '';
    } catch (error) {
      console.error('Error', error);
    }
  }
}