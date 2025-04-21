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

export type EditMessageResponse = {
  id: string,
  text: string,
  status: {
    isEdited: boolean,
  }
}

export type DeleteMessageResponse = {
  id: string,
  status: {
    isDeleted: boolean,
  }
}

export type ReadMessageResponse = {
  id: string,
  status: {
    isReaded: boolean,
  }
}

export type DeliverMessageResponse = {
  id: string,
  status: {
    isDelivered: boolean,
  }
}