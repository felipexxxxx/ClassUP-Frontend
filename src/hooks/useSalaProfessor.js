import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarSalaPorId, editarAtividadeApi, deletarAtividadeApi} from "../services/professorService";

export default function useSalaProfessor() {
  const { id } = useParams();
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState("atividades");
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [avisoSelecionado, setAvisoSelecionado] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState(null);

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

  const editarAtividade = async (id, dados) => {
    try {
      await editarAtividadeApi(id, dados);
      setMensagemSucesso("Atividade atualizada com sucesso!");
      setTimeout(() => setMensagemSucesso(null), 3000);
      atualizarSala(); // atualiza a lista após edição
    } catch (err) {
      console.error("Erro ao editar atividade:", err);
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
    editarAtividade,
    setAvisoSelecionado,
    excluirAtividade,
    excluirAviso: (id) => console.log("Excluir aviso", id),
    removerAluno: (id) => console.log("Remover aluno", id),
    abaAtiva,
    setAbaAtiva,
    carregando,
  };
}
