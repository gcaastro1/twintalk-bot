import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import PageLayout from "../../components/layout/PageLayout";
import Button from "../../components/ui/Button";
import { useUser } from "../../context/UserContext";
import type { IMessage } from "../../types/Message";
import "./styles.scss";

export default function History() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!user) return;

    async function load() {
      const response = await fetch(
        `http://127.0.0.1:8000/messages/?user=${user}`
      );
      const data: IMessage[] = await response.json();
      setMessages(data);
    }

    load();
  }, [user]);

  if (!user) return <p>Você precisa escolher um usuário primeiro.</p>;

  return (
    <PageLayout>
      <PageHeader title="Histórico de Mensagens" />

      {messages.map((msg) => (
        <div key={msg.id} className="history-item">
          <p>
            <strong>Você:</strong> {msg.text}
          </p>
          <p>
            <strong>Bot:</strong> {msg.response}
          </p>
        </div>
      ))}

      <Button variant="outline" onClick={() => navigate("/")}>
        Voltar
      </Button>
    </PageLayout>
  );
}
