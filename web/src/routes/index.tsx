import { Route, Routes } from "react-router";
import ChatPage from "../pages/chat";
import History from "../pages/history";
import Login from "../pages/login";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
};
