import { BrowserRouter, Route, Routes } from "react-router-dom";
// pages
import Chat from "./pages/chat";
import History from "./pages/history";
import Login from "./pages/login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/historico" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
