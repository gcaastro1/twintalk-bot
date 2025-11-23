import type { IStoredMessage } from "../types/Message";

const API_URL = "http://127.0.0.1:8000";

export const chatService = {
  getHistory: async (userId: string): Promise<IStoredMessage[]> => {
    const response = await fetch(`${API_URL}/messages/?user=${userId}`);
    if (!response.ok) throw new Error("Erro ao buscar histórico");
    return response.json();
  },

  sendMessage: async (
    text: string,
    userId: string
  ): Promise<IStoredMessage> => {
    const response = await fetch(`${API_URL}/messages/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, user: userId }),
    });
    if (!response.ok) throw new Error("Erro ao enviar mensagem");
    return response.json();
  },
};
