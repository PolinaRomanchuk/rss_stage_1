export type WinnerViewData = {
  id: number;
  name: string;
  color: string;
  wins: number;
  time: number;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
}

export type Car = {
  name: string;
  color: string;
  id: number;
};

export type GarageState = {
  currentPage: number;
  inputName: string;
  inputColor: string;
  updateInputName: string;
  updateInputColor: string;
};

export type WinnersState = {
  currentPage: number;
  sortBy: 'id' | 'wins' | 'time';
  sortOrder: 'ASC' | 'DESC';
};