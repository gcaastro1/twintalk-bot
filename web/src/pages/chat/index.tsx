import { useState } from "react";
import { useUser } from "../../context/UserContext";
// Types
import type { IMessage } from "../../types/Message";
// Styles
import "./styles.scss";


export default function Chat() {
  const { user } = useUser();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");

  if (!user) return <p>Você precisa escolher um usuário primeiro.</p>;

  async function sendMessage() {
    if (!text.trim()) return;

    const response = await fetch("http://127.0.0.1:8000/messages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, text }),
    });

    const data: IMessage = await response.json();

    setMessages((prev) => [...prev, data]);
    setText("");
  }

  return (
    <div className="chat-container">
      <h2>Chat - Usuário {user}</h2>

      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className="message-item">
            <p><strong>Você:</strong> {msg.text}</p>
            <p><strong>Bot:</strong> {msg.response}</p>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}
