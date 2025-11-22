import { useState } from "react";
import LogoWhite from "../../assets/logo-white.svg";
import Logo from "../../assets/logo.svg";

import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";

import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";

import type { TUser } from "../../types/User";

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

export default function Login() {
  const { theme, toggleTheme } = useTheme();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState<TUser>("");

  function handleLogin() {
    if (!selectedUser) return;
    setUser(selectedUser);
    navigate("/chat");
  }

  return (
    <div className="login-wrapper">
      <div className="login-form-area">
        <Button size="sm" icon onClick={toggleTheme}>
          {theme === "dark" ? <IoSunnyOutline /> : <IoMoonOutline />}
        </Button>

        <h1 className="login-title">Bem-vindo ao Twintalk</h1>
        <p className="login-subtitle">Escolha seu usuário para continuar:</p>

        <Select
          value={selectedUser!}
          onChange={(value) => setSelectedUser(value as TUser)}
          options={[
            { label: "Usuário A", value: "A" },
            { label: "Usuário B", value: "B" },
          ]}
        />

        <Button fullWidth disabled={!selectedUser} onClick={handleLogin}>
          Entrar
        </Button>
      </div>

      <div className="login-brand-area">
        <img
          src={theme === "dark" ? Logo : LogoWhite}
          className="login-brand-logo"
        />
      </div>
    </div>
  );
}
