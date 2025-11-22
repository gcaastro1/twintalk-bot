import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
//Types
import type { TUser } from "../../types/User";
// Styles
import "./styles.scss";

export default function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  function handleSelect(userType: TUser) {
    setUser(userType);
    navigate("/chat");
  }

  return (
    <div className="login-container">
      <h1>Bem-vindo ao Twintalk</h1>
      <p>Selecione um usuário para continuar:</p>

      <div className="login-buttons">
        <button onClick={() => handleSelect("A")}>Entrar como Usuário A</button>
        <button onClick={() => handleSelect("B")}>Entrar como Usuário B</button>
      </div>
    </div>
  );
}
