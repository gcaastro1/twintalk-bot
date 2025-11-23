import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageSidebar from "../../components/layout/PageSidebar";
import PageTopbar from "../../components/layout/PageTopbar";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useUser } from "../../context/UserContext";
import type { IStoredMessage } from "../../types/Message";
import "./styles.scss";

export default function History() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<IStoredMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    async function loadHistory() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/messages/?user=${user}`
        );
        if (!response.ok) throw new Error("Erro ao carregar histórico");
        const data = await response.json();
        setMessages(data.reverse());
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [user, navigate]);

  const filteredMessages = messages.filter((msg) => {
    const term = search.toLowerCase();
    const inText = msg.text.toLowerCase().includes(term);
    const inResponse = msg.response.toLowerCase().includes(term);
    return inText || inResponse;
  });

  return (
    <div className="history-layout">
      <PageSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="history-main">
        <PageTopbar
          title="Histórico"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="history-content">
          <header className="history-header">
            <div className="header-title">
              <h2>Histórico de {user}</h2>
              <p>Veja todas as suas interações passadas.</p>
            </div>
            <div className="search-container">
              <Input
                placeholder="Pesquisar nas mensagens..."
                value={search}
                onChange={setSearch}
                fullWidth
              />
            </div>
          </header>

          {loading ? (
            <p className="loading-text">Carregando histórico...</p>
          ) : filteredMessages.length === 0 ? (
            <div className="empty-state">
              {search
                ? `Nenhum resultado encontrado para "${search}"`
                : "Nenhuma conversa encontrada."}
            </div>
          ) : (
            <div className="history-grid">
              {filteredMessages.map((msg) => (
                <Card key={msg.id} className="history-card">
                  <div className="card-header">
                    <span className="badge">Pergunta</span>
                    <span className="date">
                      {new Date(msg.created_at).toLocaleDateString()} às{" "}
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="question-text">"{msg.text}"</p>

                  <div className="divider"></div>

                  <div className="card-response">
                    <span className="badge bot">Resposta</span>
                    <p className="response-text">{msg.response}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
