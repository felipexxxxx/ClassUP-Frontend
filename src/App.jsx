import { Routes, Route, Navigate } from "react-router-dom";
import TelaInicial from "./pages/TelaInicial";
import Login from "./pages/login/TelaLogin";
import TelaAluno from "./pages/aluno/TelaAlunoSala";
import TelaAcessoSala from "./pages/aluno/TelaAcessoSala";
import TelaQuemSomos from "./pages/TelaQuemSomos";


function App() {
  return (
    <Routes>
      <Route path="/TelaInicial" element={<TelaInicial />} />
      <Route path="/sobre" element={<TelaQuemSomos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/aluno/sala" element={<TelaAluno />} />
      <Route path="/aluno/entrar" element={<TelaAcessoSala />} />
      {/* Redireciona da raiz para login */}
      <Route path="/" element={<Navigate to="/TelaInicial" />} />
    </Routes>
  );
}

export default App;
