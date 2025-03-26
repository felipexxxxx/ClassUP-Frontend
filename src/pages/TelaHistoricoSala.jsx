import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TabsAluno from "../components/shared/TabsAluno";
import AnimacaoEntrada from "../components/shared/AnimacaoEntrada";
import useHistorico from "../hooks/useHistorico";

import AbaAtividadesHistorico from "../components/historico/AbaAtividadesHistorico";
import AbaAvisosHistorico from "../components/historico/AbaAvisosHistorico";
import AbaAlunosHistorico from "../components/historico/AbaAlunosHistorico";

export default function TelaHistoricoSala() {
  const { id } = useParams();
  const {
    dadosDetalhes: dados,
    carregandoDetalhes: carregando,
    abaAtiva,
    setAbaAtiva
  } = useHistorico(id);

  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [avisoSelecionado, setAvisoSelecionado] = useState(null);

  if (carregando) {
    return <p className="text-center text-indigo-200 mt-10">Carregando...</p>;
  }

  if (!dados) {
    return <p className="text-center text-red-400 mt-10">Erro ao carregar histórico.</p>;
  }

  const { nomeSala, professor, alunos, atividades, avisos } = dados;

  const tabs = [
    { id: "atividades", label: "Atividades" },
    { id: "avisos", label: "Avisos" },
    { id: "colegas", label: "Colegas" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header nomeSala={nomeSala} />
      <TabsAluno tabs={tabs} abaAtiva={abaAtiva} onChange={setAbaAtiva} />

      <main className="flex-grow p-10 max-w-6xl w-full mx-auto">
        <AnimacaoEntrada key={abaAtiva}>
          {abaAtiva === "atividades" && (
            <AbaAtividadesHistorico
              atividades={atividades}
              atividadeSelecionada={atividadeSelecionada}
              setAtividadeSelecionada={setAtividadeSelecionada}
            />
          )}

          {abaAtiva === "avisos" && (
            <AbaAvisosHistorico
              avisos={avisos}
              avisoSelecionado={avisoSelecionado}
              setAvisoSelecionado={setAvisoSelecionado}
            />
          )}

          {abaAtiva === "colegas" && (
            <AbaAlunosHistorico
              alunos={alunos}
              professor={professor}
            />
          )}
        </AnimacaoEntrada>
      </main>

      <Footer />
    </div>
  );
}
