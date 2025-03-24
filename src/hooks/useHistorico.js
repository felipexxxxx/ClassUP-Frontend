import { useEffect, useState } from "react";
import { buscarHistorico, buscarDetalhesHistorico } from "../services/historicoService";

export default function useHistorico(id = null) {
  const [historico, setHistorico] = useState([]);
  const [dadosDetalhes, setDadosDetalhes] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [carregandoDetalhes, setCarregandoDetalhes] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState("atividades");

  useEffect(() => {
    if (id) {
      async function carregarDetalhes() {
        try {
          const data = await buscarDetalhesHistorico(id);
          setDadosDetalhes(data);
        } catch (error) {
          console.error("Erro ao carregar detalhes do histórico:", error);
        } finally {
          setCarregandoDetalhes(false);
        }
      }
      carregarDetalhes();
    } else {
      async function carregarLista() {
        try {
          const data = await buscarHistorico();
          setHistorico(data);
        } catch (error) {
          console.error("Erro ao carregar histórico:", error);
        } finally {
          setCarregando(false);
        }
      }
      carregarLista();
    }
  }, [id]);

  return {
    historico,
    dadosDetalhes,
    carregando,
    carregandoDetalhes,
    abaAtiva,
    setAbaAtiva,
  };
}
