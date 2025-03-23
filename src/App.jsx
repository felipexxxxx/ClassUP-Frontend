import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/TelaLogin";
import TelaAluno from "./pages/aluno/TelaAlunoSala";
import TelaAcessoSala from "./pages/aluno/TelaAcessoSala";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/aluno/sala" element={<TelaAluno />} />
      <Route path="/aluno/entrar" element={<TelaAcessoSala />} />
      {/* Redireciona da raiz para login */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
