import { useEffect, useMemo, useState } from "react";
import { useUser } from "../context/UserContext";
import { chatService } from "../services/api";
import type { IStoredMessage } from "../types/Message";

export function useHistory() {
  const { user } = useUser();
  const [messages, setMessages] = useState<IStoredMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    
    chatService.getHistory(user)
      .then((data) => setMessages(data.reverse()))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const filteredMessages = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return messages.filter(msg => 
      msg.text.toLowerCase().includes(term) || 
      msg.response.toLowerCase().includes(term)
    );
  }, [messages, searchTerm]);

  return {
    messages: filteredMessages,
    loading,
    searchTerm,
    setSearchTerm
  };
}