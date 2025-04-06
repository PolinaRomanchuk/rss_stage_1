const STORAGE_KEY = 'my-garage-state';

type GarageState = {
  currentPage: number;
  inputName: string;
  inputColor: string;
  updateInputName: string;
  updateInputColor: string;
};

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

export function setCurrentPage(page: number) {
  garageState.currentPage = page;
}

export function setInputName(name: string) {
  garageState.inputName = name;
}

export function setInputColor(color: string) {
  garageState.inputColor = color;
}

export function setGarageInputs(name: string, color: string) {
  garageState.inputName = name;
  garageState.inputColor = color;
}

export function setUpdateInputs(name: string, color: string) {
  garageState.updateInputName = name;
  garageState.updateInputColor = color;
}

export function setUpdateInputName(name: string) {
  garageState.updateInputName = name;
}

export function setUpdateInputColor(color: string) {
  garageState.updateInputColor = color;
}


export function saveGarageStateToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(garageState));
}

export function loadGarageStateFromStorage() {
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