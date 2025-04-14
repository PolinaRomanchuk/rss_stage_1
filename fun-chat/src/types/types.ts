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

export type Message = {
  id: string,
  from: string,
  to: string,
  text: string,
  datetime: number,
  status: MessageStatus,
}

export type MessageStatus = {
  isDelivered: boolean,
  isReaded: boolean,
  isEdited: boolean,
}