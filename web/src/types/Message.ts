export interface IMessage {
  id: number;
  user: "A" | "B";
  text: string;
  response: string;
  created_at: string;
}
