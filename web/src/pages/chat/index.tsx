import { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/layout/PageSidebar";
import Topbar from "../../components/layout/PageTopbar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useUser } from "../../context/UserContext";
import type { IChatMessage, IStoredMessage } from "../../types/Message";
import "./styles.scss";

export default function ChatPage() {
  const { user } = useUser();
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!user) return;

    async function loadPreviousChat() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/messages/?user=${user}`
        );
        if (!response.ok) return;

        const data: IStoredMessage[] = await response.json();

        const restoredMessages: IChatMessage[] = [];

        data.forEach((item) => {
          restoredMessages.push({
            id: item.id,
            text: item.text,
            sender: "user",
            timestamp: new Date(item.created_at),
          });

          restoredMessages.push({
            id: item.id + 0.1,
            text: item.response,
            sender: "bot",
            timestamp: new Date(item.created_at),
          });
        });

        setMessages(restoredMessages);
      } catch (error) {
        console.error("Erro ao restaurar chat", error);
      }
    }

    loadPreviousChat();
  }, [user]);

  function clearChat() {
    setMessages([]);
    setSidebarOpen(false);
  }

  async function handleSend() {
    if (!input.trim() || !user) return;

    const userText = input;
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);

    const tempUserMsg: IChatMessage = {
      id: Date.now(),
      text: userText,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const response = await fetch("http://127.0.0.1:8000/messages/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText, user: user }),
      });

      if (!response.ok) throw new Error("Erro na API");

      const data = await response.json();

      const botMessage: IChatMessage = {
        id: data.id,
        text: data.response,
        sender: "bot",
        timestamp: new Date(data.created_at),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro ao enviar", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }

  return (
    <div className="chat-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={clearChat}
        disabled={isLoading}
      />

      <main className="chat-main">
        <Topbar
          title={`Chat de ${user || "Visitante"}`}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="chat-body">
          {messages.length === 0 ? (
            <div className="chat-empty">
              <h3>Olá, {user}</h3>
              <p>O seu histórico foi carregado. Continue a conversa!</p>
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
            ref={inputRef}
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
            loading={isLoading}
          >
            <span style={{ fontSize: "1.2rem" }}>➤</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
