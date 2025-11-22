export type TSender = "user" | "bot";

export interface IMessageBase {
  id: number;
  text: string;
}

export interface IChatMessage extends IMessageBase {
  sender: "user" | "bot";
  timestamp: Date;
}

export interface IStoredMessage extends IMessageBase {
  user: "A" | "B";
  response: string;
  created_at: string;
}
