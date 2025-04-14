export type ElementParams = {
  tag: keyof HTMLElementTagNameMap;
  classNames?: string[];
  textContent?: string;
  callback?: (event: Event) => void;
}

export type User = {
  login: string,
  isLogined: boolean,
}