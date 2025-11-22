// src/pages/chat/index.tsx
import { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/layout/PageSidebar";
import Topbar from "../../components/layout/PageTopbar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useUser } from "../../context/UserContext";
import type { IChatMessage } from "../../types/Message";
import "./styles.scss";

export default function ChatPage() {
  const { user } = useUser();

  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || !user) return;

    const userText = input;
    setInput("");

    const userMessage: IChatMessage = {
      id: Date.now(),
      text: userText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockResponse =
        user === "A"
          ? "Olá Usuário A! Recebemos sua mensagem. Nossa equipe de suporte nível A responderá em breve."
          : "Oi Usuário B! Tudo bem? Um especialista nível B já vai te atender.";

      const botMessage: IChatMessage = {
        id: Date.now() + 1,
        text: mockResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="chat-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="chat-main">
        <Topbar
          title={`Chat - ${user || "Visitante"}`}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="chat-body">
          {messages.length === 0 ? (
            <div className="chat-empty">
              <h3>Olá, {user}</h3>
              <p>Digite algo para iniciar o atendimento simulado.</p>
            </div>
          ) : (
            <div className="messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${
                    msg.sender === "user" ? "user" : "bot"
                  }`}
                >
                  <div className="msg-text">{msg.text}</div>
                  <span className="msg-time">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="message bot typing">
                  <span>●</span>
                  <span>●</span>
                  <span>●</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="chat-input-area">
          <Input
            placeholder="Digite sua mensagem..."
            value={input}
            fullWidth
            multiline
            onChange={(value) => setInput(value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />

          <Button
            icon
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
          >
            <span style={{ fontSize: "1.2rem" }}>➤</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
