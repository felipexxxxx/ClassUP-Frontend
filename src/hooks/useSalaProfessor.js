import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  buscarSalaPorId,
  editarAtividadeApi,
  deletarAtividadeApi,
  editarAvisoApi,
  excluirAvisoApi,
  removerAlunoApi,
  buscarResumoAtividadeApi
} from "../services/professorService";

export default function useSalaProfessor() {
  const { id } = useParams();
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState("atividades");
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [avisoSelecionado, setAvisoSelecionado] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState(null);
  const [resumoAtividade, setResumoAtividade] = useState(null);

  useEffect(() => {
    fetchDados();
  }, [id]);

  const fetchDados = async () => {
    try {
      const data = await buscarSalaPorId(id);
      setDados(data);
    } catch (err) {
      console.error("Erro ao buscar detalhes da sala:", err);
    } finally {
      setCarregando(false);
    }
  };

  const atualizarSala = async () => {
    try {
      const data = await buscarSalaPorId(id);
      setDados(data);
    } catch (err) {
      console.error("Erro ao atualizar sala:", err);
    }
  };

  const editarAtividade = async (id, dados) => {
    try {
      await editarAtividadeApi(id, dados);
      setMensagemSucesso("Atividade atualizada com sucesso!");
      setTimeout(() => setMensagemSucesso(null), 3000);
      atualizarSala();
    } catch (err) {
      console.error("Erro ao editar atividade:", err);
    }
  };

  const excluirAtividade = async (id) => {
    try {
      await deletarAtividadeApi(id);
      setMensagemSucesso("Atividade excluída com sucesso!");
      setTimeout(() => setMensagemSucesso(null), 3000);
      atualizarSala();
    } catch (err) {
      console.error("Erro ao excluir atividade:", err);
    }
  };

  const editarAviso = async (id, dados) => {
    try {
      await editarAvisoApi(id, dados);
      setMensagemSucesso("Aviso atualizado com sucesso!");
      setTimeout(() => setMensagemSucesso(null), 3000);
      atualizarSala();
    } catch (err) {
      console.error("Erro ao editar aviso:", err);
    }
  };

  const excluirAviso = async (id) => {
    try {
      await excluirAvisoApi(id);
      setMensagemSucesso("Aviso excluído com sucesso!");
      setTimeout(() => setMensagemSucesso(null), 3000);
      atualizarSala();
    } catch (err) {
      console.error("Erro ao excluir aviso:", err);
    }
  };

  const removerAluno = async (alunoId) => {
    try {
      await removerAlunoApi(alunoId);
      setMensagemSucesso("Aluno removido com sucesso!");
      atualizarSala(); // atualiza lista de alunos
      setTimeout(() => setMensagemSucesso(null), 3000);
    } catch (err) {
      console.error("Erro ao remover aluno:", err);
    }
  };
  const selecionarAtividade = async (atividade) => {
    setAtividadeSelecionada(atividade);
    try {
      const resumo = await buscarResumoAtividadeApi(atividade.id);
      setResumoAtividade(resumo);
    } catch (error) {
      console.error("Erro ao buscar resumo da atividade:", error);
    }
  };
  
  

  return {
    dados,
    atualizarSala,
    mensagemSucesso,
    setMensagemSucesso,
    atividadeSelecionada,
    setAtividadeSelecionada,
    avisoSelecionado,
    setAvisoSelecionado,
    selecionarAtividade,
    resumoAtividade,
    editarAtividade,
    excluirAtividade,
    editarAviso,
    excluirAviso,
    removerAluno,
    abaAtiva,
    setAbaAtiva,
    carregando,
  };
}
