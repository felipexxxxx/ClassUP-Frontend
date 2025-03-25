import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarSalaPorId } from "../services/professorService";

export default function useSalaProfessor() {
  const { id } = useParams();
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState("atividades");
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [avisoSelecionado, setAvisoSelecionado] = useState(null);

  useEffect(() => {
    async function fetchDados() {
      try {
        const data = await buscarSalaPorId(id); // corrigido aqui!
        setDados(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes da sala:", err);
      } finally {
        setCarregando(false);
      }
    }

    fetchDados();
  }, [id]);

  return {
    dados,
    perfil: dados?.professor,
    mensagemSucesso: null,
    atividadeSelecionada,
    setAtividadeSelecionada,
    avisoSelecionado,
    setAvisoSelecionado,
    excluirAtividade: (id) => console.log("Excluir atividade", id), // implementar
    excluirAviso: (id) => console.log("Excluir aviso", id), // implementar
    removerAluno: (id) => console.log("Remover aluno", id), // implementar
    abaAtiva,
    setAbaAtiva,
    carregando
  };
}
