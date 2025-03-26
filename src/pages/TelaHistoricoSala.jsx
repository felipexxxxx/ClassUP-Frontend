import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TabsAluno from "../components/shared/TabsAluno";
import CardAtividade from "../components/shared/CardAtividade";
import ModalDetalheAtividade from "../components/shared/ModalDetalheAtividade";
import CardAviso from "../components/shared/CardAviso";
import ModalDetalheAviso from "../components/shared/ModalDetalheAviso";
import AnimacaoEntrada from "../components/shared/AnimacaoEntrada";
import useHistorico from "../hooks/useHistorico";
import formatarData from "../utils/formatarData";

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

  const fecharModal = () => {
    setAtividadeSelecionada(null);
    setAvisoSelecionado(null);
  };

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
            <>
              <h2 className="text-5xl font-bold text-indigo-300 mb-8">Atividades</h2>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {atividades.length === 0 ? (
                  <p className="text-2xl text-indigo-200">Nenhuma atividade encontrada.</p>
                ) : (
                  atividades.map((atividade) => (
                    <CardAtividade
                      key={atividade.id}
                      atividade={atividade}
                      onClick={() => setAtividadeSelecionada(atividade)}
                      modoSomenteLeitura={true} 
                    />
                  ))
                )}
              </section>

              {atividadeSelecionada && (
                <ModalDetalheAtividade
                  atividade={atividadeSelecionada}
                  onClose={fecharModal}
                  modoSomenteLeitura={true}
                />
              )}
            </>
          )}

          {abaAtiva === "avisos" && (
            <>
              <h2 className="text-5xl font-bold text-indigo-300 mb-8">Avisos</h2>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {avisos.length === 0 ? (
                  <p className="text-2xl text-indigo-200">Nenhum aviso encontrado.</p>
                ) : (
                  avisos.map((aviso) => (
                    <CardAviso
                      key={aviso.id}
                      aviso={{
                        ...aviso,
                        enviadaEmFormatada: formatarData(aviso.enviadaEm)
                      }}
                      onClick={() => setAvisoSelecionado(aviso)}
                    />
                  ))
                )}
              </section>

              {avisoSelecionado && (
                <ModalDetalheAviso
                  aviso={avisoSelecionado}
                  onClose={fecharModal}
                />
              )}
            </>
          )}

            {abaAtiva === "colegas" && (
              <>
                <h2 className="text-5xl font-bold text-indigo-300 mb-8">
                  Alunos <span className="text-indigo-400 text-2xl">({alunos.length + 1})</span>
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Card do professor */}
                  <li className="bg-gray-800 px-6 py-6 min-h-[120px] rounded-2xl shadow-md hover:shadow-indigo-500/20 hover:bg-gray-700 hover:scale-[1.02] transition-all duration-200 ease-in-out">
                    <div className="text-xl font-semibold text-white break-words mb-1">
                      {professor.nome}
                    </div>
                    <div className="text-sm text-indigo-300">Professor(a)</div>
                  </li>

                  {/* Cards dos alunos */}
                  {alunos.map((aluno) => (
                    <li
                      key={aluno.id}
                      className="bg-gray-800 px-6 py-6 min-h-[120px] rounded-2xl shadow-md hover:shadow-indigo-500/20 hover:bg-gray-700 hover:scale-[1.02] transition-all duration-200 ease-in-out"
                    >
                      <div className="text-xl font-semibold text-white break-words mb-1">
                        {aluno.nome}
                      </div>
                      <div className="text-sm text-indigo-300">Aluno(a)</div>
                    </li>
                  ))}
                </ul>
              </>
            )}

        </AnimacaoEntrada>
      </main>

      <Footer />
    </div>
  );
}