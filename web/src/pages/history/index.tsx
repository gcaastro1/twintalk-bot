// src/pages/history/index.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageSidebar from "../../components/layout/PageSidebar";
import PageTopbar from "../../components/layout/PageTopbar";
import Card from "../../components/ui/Card"; // Usando seu componente existente
import { useUser } from "../../context/UserContext";
import type { IStoredMessage } from "../../types/Message";
import "./styles.scss";

export default function History() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<IStoredMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Se não tiver usuário, volta pro login
    if (!user) {
        navigate("/");
        return;
    }

    async function loadHistory() {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/messages/?user=${user}`);
        
        if (!response.ok) throw new Error("API Offline");
        
        const data: IStoredMessage[] = await response.json();
        setMessages(data);

      } catch (error) {
        console.warn("Backend não conectado. Usando dados mockados para visualização.");
        
        // --- FALLBACK: DADOS MOCKADOS (Para testares visualmente agora) ---
        const mockDataA: IStoredMessage[] = [
            { id: 1, user: "A", text: "Qual o horário de atendimento?", response: "Olá! Atendemos das 08h às 18h.", created_at: new Date().toISOString() },
            { id: 2, user: "A", text: "Onde baixo a nota fiscal?", response: "No menu 'Financeiro' do portal.", created_at: new Date().toISOString() }
        ];
        
        const mockDataB: IStoredMessage[] = [
            { id: 3, user: "B", text: "Preço do plano Pro?", response: "O plano Pro custa R$ 99,90.", created_at: new Date().toISOString() },
            { id: 4, user: "B", text: "Quero cancelar.", response: "Que pena! Entre em contato com o suporte.", created_at: new Date().toISOString() }
        ];

        // Filtra pelo usuário logado (A ou B) 
        setMessages(user === "A" ? mockDataA : mockDataB);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [user, navigate]);

  return (
    <div className="history-layout">
      {/* Mantendo a mesma estrutura do Chat para consistência */}
      <PageSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="history-main">
        <PageTopbar title="Histórico de Conversas" onMenuClick={() => setSidebarOpen(true)} />

        <div className="history-content">
          <header className="history-header">
            <h2>Histórico de {user}</h2>
            <p>Veja todas as interações passadas.</p>
          </header>

          {loading ? (
            <p>Carregando histórico...</p>
          ) : messages.length === 0 ? (
            <div className="empty-state">Nenhuma conversa encontrada.</div>
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
                  
                  <div className="card-response">
                    <span className="badge bot">Resposta do Bot</span>
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