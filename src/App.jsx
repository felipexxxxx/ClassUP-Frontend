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




function App() {
  return (
    <Routes>
      <Route path="/Inicio" element={<TelaInicial />} />
      <Route path="/Sobre" element={<TelaQuemSomos />} />
      <Route path="/Login" element={<TelaLogin />} />
      <Route path="/Professor/Painel" element={<TelaPainelProfessor />} />
      <Route path="/Sala/:id" element={<TelaSalaProfessor />} />
      <Route path="/Aluno/Sala" element={<TelaAluno />} />
      <Route path="/Aluno/Entrar" element={<TelaAcessoSala />} />
      <Route path="/Perfil" element={<TelaPerfil />} />
      <Route path="/Historico" element={<TelaHistorico />} />
      <Route path="/Historico/:id" element={<TelaHistoricoDetalhes />} />
      <Route path="/" element={<Navigate to="/Inicio" />} />
    </Routes>
  );
}

export default App;
