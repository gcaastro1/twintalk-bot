import { useCallback, useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { chatService } from "../services/api";
import type { IChatMessage } from "../types/Message";

export function useChat() {
  const { user } = useUser();
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    chatService
      .getHistory(user)
      .then((data) => {
        const restored: IChatMessage[] = [];
        data.forEach((item) => {
          restored.push({
            id: item.id,
            text: item.text,
            sender: "user",
            timestamp: new Date(item.created_at),
          });
          restored.push({
            id: item.id + 0.1,
            text: item.response,
            sender: "bot",
            timestamp: new Date(item.created_at),
          });
        });
        setMessages(restored);
      })
      .catch(console.error);
  }, [user]);

  const sendMessage = async (text: string) => {
    if (!user) return;

    const tempId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: tempId, text, sender: "user", timestamp: new Date() },
    ]);
    setIsLoading(true);

    try {
      const data = await chatService.sendMessage(text, user);
      setMessages((prev) => [
        ...prev,
        {
          id: data.id,
          text: data.response,
          sender: "bot",
          timestamp: new Date(data.created_at),
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = useCallback(() => setMessages([]), []);

  return {
    messages,
    sendMessage,
    clearChat,
    isLoading,
  };
}
