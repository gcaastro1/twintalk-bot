import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { IoLogOutOutline, IoMenuOutline } from "react-icons/io5";
import { useTheme } from "../../../context/ThemeContext";
import { useUser } from "../../../context/UserContext";
import type { ITopbarProps } from "../../../types/Components";
import Button from "../../ui/Button";
import "./styles.scss";

export default function Topbar({ title, onMenuClick }: ITopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { setUser } = useUser();

  return (
    <header className="topbar">
      <div className="mobile-menu-btn">
        {onMenuClick && (
          <Button icon size="sm" onClick={onMenuClick}>
            <IoMenuOutline size={22} />
          </Button>
        )}
      </div>

      <h2>{title}</h2>

      <div className="actions">
        <Button icon size="sm" onClick={toggleTheme}>
          {theme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />}
        </Button>

        <Button icon size="sm" onClick={() => setUser(null)}>
          <IoLogOutOutline />
        </Button>
      </div>
    </header>
  );
}
