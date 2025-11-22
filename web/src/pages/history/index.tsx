import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
// Types
import type { IMessage } from "../../types/Message";
// Styles
import "./styles.scss";

export default function History() {
  const { user } = useUser();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!user) return;

    async function load() {
      const response = await fetch(`http://127.0.0.1:8000/messages/?user=${user}`);
      const data: IMessage[] = await response.json();
      setMessages(data);
    }

    load();
  }, [user]);

  if (!user) return <p>Você precisa escolher um usuário primeiro.</p>;

  return (
    <div className="history-container">
      <h2>Histórico - Usuário {user}</h2>

      {messages.map((msg) => (
        <div key={msg.id} className="history-item">
          <p><strong>Você:</strong> {msg.text}</p>
          <p><strong>Bot:</strong> {msg.response}</p>
        </div>
      ))}
    </div>
  );
}
