import { useState, useEffect } from "react";
import {
  buscarSalaCompletaDoAluno,
  confirmarPresencaAtividade,
  cancelarPresencaAtividade
} from "../services/alunoService";
import { buscarPerfil } from "../services/authService";

export default function useAlunoSala() {
  const [perfil, setPerfil] = useState({});
  const [atividades, setAtividades] = useState([]);
  const [avisos, setAvisos] = useState([]); 
  const [colegas, setColegas] = useState([]);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [avisoSelecionado, setAvisoSelecionado] = useState(null);
  const [nomeSala, setNomeSala] = useState("");

  useEffect(() => {
    carregarTudo();
  }, []);

  const carregarTudo = async () => {
    const [perfilData, salaData] = await Promise.all([
      buscarPerfil(),
      buscarSalaCompletaDoAluno()
    ]);

    setPerfil(perfilData);
    setNomeSala(salaData.nome);
    setAtividades(salaData.atividades || []);
    console.log("Atividades recebidas:", salaData.atividades);
    setAvisos(salaData.avisos || []);
    setColegas([salaData.professor, ...(salaData.alunos || [])]);
  };

  const confirmarPresenca = async (id) => {
    try {
      await confirmarPresencaAtividade(id);
      await atualizarAtividades();
      setMensagemSucesso("Presença confirmada com sucesso!");
      setAtividadeSelecionada(null);
    } catch (err) {
      console.error("Erro ao confirmar presença:", err);
    }
  };

  const cancelarPresenca = async (id) => {
    try {
      await cancelarPresencaAtividade(id);
      await atualizarAtividades();
      setMensagemSucesso("Presença cancelada com sucesso!");
      setAtividadeSelecionada(null);
    } catch (err) {
      console.error("Erro ao cancelar presença:", err);
    }
  };

  const atualizarAtividades = async () => {
    const salaAtualizada = await buscarSalaCompletaDoAluno();
    setAtividades(salaAtualizada.atividades || []);
  };

  return {
    perfil,
    nomeSala,
    atividades,
    avisoSelecionado,
    avisos,
    colegas,
    mensagemSucesso,
    atividadeSelecionada,
    setMensagemSucesso,
    setAtividadeSelecionada,
    setAvisoSelecionado,
    confirmarPresenca,
    cancelarPresenca
  };
}
