import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import Sidebar from "../../components/layout/PageSidebar";
import Topbar from "../../components/layout/PageTopbar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useUser } from "../../context/UserContext";
import { useChat } from "../../hooks/useChat";
import "./styles.scss";

export default function ChatPage() {
  const { user } = useUser();

  const { messages, sendMessage, clearChat, isLoading } = useChat();

  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");

    setTimeout(() => inputRef.current?.focus(), 10);
    await sendMessage(text);
  };

  return (
    <div className="chat-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={() => {
          clearChat();
          setSidebarOpen(false);
        }}
        disabled={isLoading}
      />

      <main className="chat-main">
        <Topbar
          title={`Chat de ${user}`}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="chat-body">
          <div className="messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
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
        </div>

        <div className="chat-input-area">
          <Input
            ref={inputRef}
            value={input}
            multiline
            placeholder="Digite sua mensagem..."
            onChange={setInput}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
            fullWidth
          />
          <Button
            icon
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            loading={isLoading}
          >
            <IoSend />
          </Button>
        </div>
      </main>
    </div>
  );
}
