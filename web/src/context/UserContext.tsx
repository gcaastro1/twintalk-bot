import { createContext, useContext, useEffect, useState } from "react";
import type { TUser } from "../types/User";

interface IUserContext {
  user: TUser | null;
  setUser: (u: TUser | null) => void;
  loading: boolean;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("twintalk:user");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserState(parsed); 
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
        setUserState(null); 
      }
    }

    setLoading(false);
  }, []);

  const setUser = (value: TUser | null) => {
    setUserState(value);

    if (value) {
      localStorage.setItem("twintalk:user", JSON.stringify(value));
    } else {
      localStorage.removeItem("twintalk:user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
