// src/hooks/useAlunoSala.js
import { useState, useEffect } from "react";
import {
  buscarPerfil,
  buscarAtividades,
  buscarColegas,
  confirmarPresencaAtividade,
  cancelarPresencaAtividade
} from "../services/alunoService";

export default function useAlunoSala() {
  const [perfil, setPerfil] = useState({});
  const [atividades, setAtividades] = useState([]);
  const [colegas, setColegas] = useState([]);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [nomeSala, setNomeSala] = useState("");

  useEffect(() => {
    carregarTudo();
  }, []);

  const carregarTudo = async () => {
    const [perfilData, atividadesData, salaData] = await Promise.all([
      buscarPerfil(),
      buscarAtividades(),
      buscarColegas()
    ]);

    setPerfil(perfilData);
    setAtividades(atividadesData);
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
    colegas,
    mensagemSucesso,
    atividadeSelecionada,
    setAtividadeSelecionada,
    confirmarPresenca,
    cancelarPresenca
  };
}
