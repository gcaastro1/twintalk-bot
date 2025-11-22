import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useTheme } from "../../../context/ThemeContext";
import { useBack } from "../../../hooks/useBack";
import type { IPageHeaderProps } from "../../../types/Components";
import Button from "../../ui/Button";
import "./styles.scss";

export default function PageHeader({
  title,
  showBack = true,
}: IPageHeaderProps) {
  const goBack = useBack();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="page-header">
      <div className="left">
        {showBack && (
          <Button variant="outline" size="sm" onClick={goBack}>
            Voltar
          </Button>
        )}
      </div>

      <h1 className="page-title">{title}</h1>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />}
      </button>
    </div>
  );
}
