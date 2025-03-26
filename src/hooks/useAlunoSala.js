import { useState, useEffect } from "react";
import {
  buscarAtividades,
  buscarColegas,
  buscarAvisos,
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
    const [perfilData, atividadesData, salaData, avisosData] = await Promise.all([
      buscarPerfil(),
      buscarAtividades(),
      buscarColegas(),
      buscarAvisos()
    ]);

    const exibirMensagem = (msg) => {
      setMensagemSucesso(msg);
      setTimeout(() => setMensagemSucesso(""), 2000);
    };
  
    const atualizarStatusAtividade = (id, novoStatus) => {
      setAtividades((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: novoStatus } : a
        )
      );
    };

    setPerfil(perfilData);
    setAtividades(atividadesData);
    setAvisos(avisosData); 
    setColegas([salaData.professor, ...salaData.alunos]);
    setNomeSala(salaData.nome);
  };

  const confirmarPresenca = async (id) => {
    await confirmarPresencaAtividade(id);
    await atualizarAtividades("Presença confirmada com sucesso!");
  };

  const cancelarPresenca = async (id) => {
    await cancelarPresencaAtividade(id);
    await atualizarAtividades("Presença cancelada com sucesso!");
  };

  const atualizarAtividades = async (mensagem) => {
    const novasAtividades = await buscarAtividades();
    setAtividades(novasAtividades);
    setMensagemSucesso(mensagem);
    setAtividadeSelecionada(null);
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
