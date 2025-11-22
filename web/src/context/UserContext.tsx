import { createContext, useContext, useState } from "react";

// Types
import type { ReactNode } from "react";
import type { TUser } from "../types/User";

interface UserContextProps {
  user: TUser;
  setUser: (user: TUser) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TUser>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser deve ser usado dentro de <UserProvider>");
  return ctx;
}
