import { Routes, Route, Navigate } from "react-router-dom";
import TelaInicial from "./pages/TelaInicial";
import Login from "./pages/TelaLogin";
import TelaAluno from "./pages/TelaAlunoSala";
import TelaAcessoSala from "./pages/TelaAcessoSala";
import TelaQuemSomos from "./pages/TelaQuemSomos";
import TelaPerfil from "./pages/TelaPerfil";


function App() {
  return (
    <Routes>
      <Route path="/TelaInicial" element={<TelaInicial />} />
      <Route path="/sobre" element={<TelaQuemSomos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/aluno/sala" element={<TelaAluno />} />
      <Route path="/aluno/entrar" element={<TelaAcessoSala />} />
      <Route path="/perfil" element={<TelaPerfil />} />
      <Route path="/" element={<Navigate to="/TelaInicial" />} />
    </Routes>
  );
}

export default App;
