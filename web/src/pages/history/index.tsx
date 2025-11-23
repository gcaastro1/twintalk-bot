import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageSidebar from "../../components/layout/PageSidebar";
import PageTopbar from "../../components/layout/PageTopbar";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useUser } from "../../context/UserContext";
import { useHistory } from "../../hooks/useHistory";
import "./styles.scss";

export default function History() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { messages, loading, searchTerm, setSearchTerm } = useHistory();

  if (!user) {
    navigate("/");
    return null;
  }

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
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={setSearchTerm}
                fullWidth
              />
            </div>
          </header>

          {loading ? (
            <p className="loading-text">Carregando...</p>
          ) : (
            <div className="history-grid">
              {messages.map((msg) => (
                <Card key={msg.id} className="history-card">
                  <div className="card-header">
                    <span className="badge">Pergunta</span>
                    <span className="date">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="question-text">"{msg.text}"</p>
                  <div className="divider"></div>
                  <p className="response-text">{msg.response}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
