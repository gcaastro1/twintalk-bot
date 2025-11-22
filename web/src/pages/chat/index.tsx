import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import PageHeader from "../../components/layout/PageHeader";
import PageLayout from "../../components/layout/PageLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import type { IChatMessage } from "../../types/Message";
import "./styles.scss";

export default function ChatPage() {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;

    const userMessage: IChatMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botMessage: IChatMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Recebi sua mensagem!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  }

  return (
    <PageLayout>
      <PageHeader title="Chat" />

      <div className="chat-container">
        <div className="messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === "user" ? "user" : "bot"}`}
            >
              {msg.text}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <Input
            placeholder="Digite sua mensagem..."
            value={input}
            fullWidth
            onChange={(value) => setInput(value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} icon>
            <IoSend />
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
