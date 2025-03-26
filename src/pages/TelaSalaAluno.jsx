import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { AnimatePresence } from "framer-motion";
import TabsAluno from "../components/shared/TabsAluno";
import { motion } from "framer-motion";
import CardAtividade from "../components/shared/CardAtividade";
import ModalDetalheAtividade from "../components/shared/ModalDetalheAtividade";
import ModalDetalheAviso from "../components/shared/ModalDetalheAviso";
import CardAviso from "../components/shared/CardAviso";
import AnimacaoEntrada from "../components/shared/AnimacaoEntrada";
import useAlunoSala from "../hooks/useAlunoSala";
import formatarData from "../utils/formatarData";

export default function TelaAlunoSala() {
  const {
    perfil,
    nomeSala,
    atividades,
    avisos,
    alunos,
    mensagemSucesso,
    setMensagemSucesso,
    atividadeSelecionada,
    setAtividadeSelecionada,
    avisoSelecionado,
    setAvisoSelecionado,
    confirmarPresenca,
    cancelarPresenca,
    bloqueado
  } = useAlunoSala();

  const tabs = [
    { id: "atividades", label: "Atividades" },
    { id: "avisos", label: "Avisos" },
    { id: "colegas", label: "Colegas" }
  ];

  const [abaAtiva, setAbaAtiva] = React.useState("atividades");

  React.useEffect(() => {
    if (mensagemSucesso) {
      const timer = setTimeout(() => setMensagemSucesso(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [mensagemSucesso]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header nomeSala={nomeSala} />
      <TabsAluno tabs={tabs} abaAtiva={abaAtiva} onChange={setAbaAtiva} />

      <main className="flex-grow p-10 max-w-6xl w-full mx-auto">
      <AnimatePresence>
        {mensagemSucesso && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 bg-green-700 text-white text-center py-2 px-4 rounded shadow"
          >
            {mensagemSucesso}
          </motion.div>
        )}
    </AnimatePresence>


        <AnimatePresence mode="wait">
          {abaAtiva === "atividades" && (
            <AnimacaoEntrada key="atividades">
              <h2 className="text-5xl font-bold text-indigo-300 mb-8">Atividades</h2>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {atividades.length === 0 ? (
                  <p className="text-xl text-indigo-200">Nenhuma atividade encontrada.</p>
                ) : (
                  atividades.map((atividade) => (
                    <CardAtividade
                      key={atividade.id}
                      atividade={{ ...atividade, dataHora: atividade.data }}
                      onClick={() => !bloqueado && setAtividadeSelecionada(atividade)}
                    />
                  ))
                )}
              </section>

              <AnimatePresence>
                {atividadeSelecionada && (
                  <ModalDetalheAtividade
                    atividade={atividadeSelecionada}
                    onClose={() => setAtividadeSelecionada(null)}
                    onConfirmar={() => confirmarPresenca(atividadeSelecionada.id)}
                    onCancelar={() => cancelarPresenca(atividadeSelecionada.id)}
                  />
                )}
              </AnimatePresence>
            </AnimacaoEntrada>
          )}

          {abaAtiva === "avisos" && (
            <AnimacaoEntrada key="avisos">
              <h2 className="text-5xl font-bold text-indigo-300 mb-8">Avisos</h2>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {avisos.length === 0 ? (
                  <p className="text-xl text-indigo-200">Nenhum aviso encontrado.</p>
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

              <AnimatePresence>
                {avisoSelecionado && (
                  <ModalDetalheAviso
                    aviso={avisoSelecionado}
                    onClose={() => setAvisoSelecionado(null)}
                  />
                )}
              </AnimatePresence>
            </AnimacaoEntrada>
          )}

                {abaAtiva === "colegas" && (
                  <AnimacaoEntrada key="colegas">
                    <h2 className="text-5xl font-bold text-indigo-300 mb-8">
                      Alunos <span className="text-indigo-400 text-2xl">({alunos.length + 1})</span>
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {alunos.map((pessoa, idx) => (
                        <li
                          key={pessoa.id}
                          className="bg-gray-800 px-6 py-6 min-h-[120px] rounded-2xl shadow-md hover:shadow-indigo-500/20 hover:bg-gray-700 hover:scale-[1.02] transition-all duration-200 ease-in-out"
                        >
                          <div className="text-xl font-semibold text-white break-words mb-1">
                            {pessoa.nome}
                          </div>
                          <div className="text-sm text-indigo-300">
                            {idx === 0 ? "Professor(a)" : "Aluno(a)"}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AnimacaoEntrada>
                )}


        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
