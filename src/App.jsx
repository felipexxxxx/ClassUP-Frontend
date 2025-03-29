import { Routes, Route, Navigate } from "react-router-dom";
import TelaInicial from "./pages/TelaInicial";
import TelaLogin from "./pages/TelaLogin";
import TelaAluno from "./pages/TelaSalaAluno";
import TelaAcessoSala from "./pages/TelaSalaAcesso";
import TelaQuemSomos from "./pages/TelaQuemSomos";
import TelaPerfil from "./pages/TelaPerfil";
import TelaHistorico from "./pages/TelaHistorico";
import TelaHistoricoDetalhes from "./pages/TelaHistoricoSala";
import TelaPainelProfessor from "./pages/TelaPainelProfessor";
import TelaSalaProfessor from "./pages/TelaSalaProfessor";
import TelaAdmin from "./pages/TelaAdmin";




function App() {
  return (
    <Routes>
      <Route path="/inicio" element={<TelaInicial />} />
      <Route path="/sobre" element={<TelaQuemSomos />} />
      <Route path="/login" element={<TelaLogin />} />
      <Route path="/professor/painel" element={<TelaPainelProfessor />} />
      <Route path="/sala/:id" element={<TelaSalaProfessor />} />
      <Route path="/aluno/sala" element={<TelaAluno />} />
      <Route path="/aluno/entrar" element={<TelaAcessoSala />} />
      <Route path="/perfil" element={<TelaPerfil />} />
      <Route path="/historico" element={<TelaHistorico />} />
      <Route path="/historico/:id" element={<TelaHistoricoDetalhes />} />
      <Route path="/admin" element={<TelaAdmin />} />
      <Route path="/" element={<Navigate to="/inicio" />} />
    </Routes>
  );
}

export default App;
