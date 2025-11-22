import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function ProtectedRoutes() {
  const { user, loading } = useUser();
  
  if (loading) return null;

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
}
