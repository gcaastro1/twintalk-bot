import { UserProvider } from "./context/UserContext";
import { RoutesMain } from "./routes";

export default function App() {
  return (
    <UserProvider>
      <RoutesMain />
    </UserProvider>
  );
}
