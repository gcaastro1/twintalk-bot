import { useEffect, useState } from "react";
import { FiClock, FiMessageSquare, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../../context/UserContext";
import "./styles.scss";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat?: () => void;
  disabled?: boolean;
}

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const { user } = useUser();
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

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

  function handleNavigate(path: string) {
    navigate(path);
    if (isMobile) onClose();
  }

  return (
    <>
      <aside className={`sidebar ${isMobile && isOpen ? "open" : ""}`}>
        <div className="sidebar-user">
          <div className="avatar">
            <FiUser />
          </div>
          <span className="username">
            {user ? `Usuário ${user}` : "Visitante"}
          </span>
        </div>

        <h3 className="section-title">Menu</h3>

        <div className="chat-list">
          <div className="chat-item" onClick={() => handleNavigate("/chat")}>
            <FiMessageSquare />
            <span>Chat</span>
          </div>

          <div className="chat-item" onClick={() => handleNavigate("/history")}>
            <FiClock />
            <span>Histórico</span>
          </div>
        </div>
      </aside>

      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}
    </>
  );
}
