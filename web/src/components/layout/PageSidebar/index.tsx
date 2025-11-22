import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

import { useUser } from "../../../context/UserContext";
import "./styles.scss";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user } = useUser();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        onClose();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  return (
    <>
      <aside className={`sidebar ${isMobile && isOpen ? "open" : ""}`}>
        <div className="sidebar-user">
          <div className="avatar">
            <FiUser />
          </div>
          <span className="username">
            {user ? `Usuário ${user || user}` : "Visitante"}
          </span>
        </div>

        <h3 className="section-title">Conversas</h3>

        <div className="chat-list">
          <div className="chat-item">
            <HiOutlineChatBubbleLeftRight />
            <span>Dúvidas sobre Planos</span>
          </div>

          <div className="chat-item">
            <HiOutlineChatBubbleLeftRight />
            <span>Suporte Técnico</span>
          </div>
        </div>

        <button className="new-chat-btn">Nova Conversa</button>
      </aside>

      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}
    </>
  );
}
