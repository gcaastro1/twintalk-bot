import { useNavigate } from "react-router-dom";
import LogoDark from "../../assets/logo-white.svg";
import LogoLight from "../../assets/logo.svg";
import PageHeader from "../../components/layout/PageHeader";
import PageLayout from "../../components/layout/PageLayout";
import Button from "../../components/ui/Button";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import type { TUser } from "../../types/User";
import "./styles.scss";

export default function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { theme } = useTheme();

  function handleSelect(userType: TUser) {
    setUser(userType);
    navigate("/chat");
  }

  return (
    <PageLayout>
      <PageHeader title="" showBack={false} />
      <h1 className="login-title">Bem-vindo ao</h1>
      <img
        src={theme === "dark" ? LogoDark : LogoLight}
        alt="Twintalk"
        className="login-brand"
      />

      <p className="login-subtitle">Selecione um usuário para continuar:</p>

      <div className="login-buttons">
        <Button variant="primary" fullWidth onClick={() => handleSelect("A")}>
          Usuário A
        </Button>

        <Button variant="primary" fullWidth onClick={() => handleSelect("B")}>
          Usuário B
        </Button>
      </div>
    </PageLayout>
  );
}
