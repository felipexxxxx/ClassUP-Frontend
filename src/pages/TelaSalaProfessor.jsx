import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { AnimatePresence } from "framer-motion";
import TabsAluno from "../components/shared/TabsAluno";
import AlertaMensagem from "../components/shared/AlertaMensagem";
import CardAtividade from "../components/shared/CardAtividade";
import ModalDetalheAtividade from "../components/shared/ModalDetalheAtividade";
import ModalDetalheAviso from "../components/shared/ModalDetalheAviso";
import CardAviso from "../components/shared/CardAviso";
import AnimacaoEntrada from "../components/shared/AnimacaoEntrada";
import useSalaProfessor from "../hooks/useSalaProfessor";
import { FaTrash } from "react-icons/fa";


export default function TelaSalaProfessor() {
  const {
    dados,
    mensagemSucesso,
    atividadeSelecionada,
    setAtividadeSelecionada,
    avisoSelecionado,
    setAvisoSelecionado,
    excluirAtividade,
    excluirAviso,
    removerAluno,
    abaAtiva,
    setAbaAtiva,
  } = useSalaProfessor();

  const tabs = [
    { id: "atividades", label: "Atividades" },
    { id: "avisos", label: "Avisos" },
    { id: "alunos", label: "Alunos" },
  ];

  if (!dados) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Carregando...
      </div>
    );
  }

  const { nome: nomeSala, atividades = [], avisos = [], alunos: colegas = [], professor } = dados;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header nomeSala={nomeSala} />

      <TabsAluno tabs={tabs} abaAtiva={abaAtiva} onChange={setAbaAtiva} />

      <main className="flex-grow p-10 max-w-2xl w-full mx-auto">
        <AnimatePresence>
          {mensagemSucesso && (
            <AlertaMensagem mensagem={mensagemSucesso} tipo="sucesso" />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {abaAtiva === "atividades" && (
            <AnimacaoEntrada key="atividades">
              <h2 className="text-5xl font-bold text-indigo-300 mb-8">Atividades</h2>
              <section className="grid gap-8">
                {atividades.length === 0 ? (
                  <p className="text-xl text-indigo-200">Nenhuma atividade encontrada.</p>
                ) : (
                  atividades.map((atividade) => (
                    <CardAtividade
                      key={atividade.id}
                      atividade={atividade}
                      isProfessor
                      onDelete={() => excluirAtividade?.(atividade.id)}
                      onClick={() => setAtividadeSelecionada(atividade)}
                    />
                  ))
                )}
              </section>
              <AnimatePresence>
                {atividadeSelecionada && (
                  <ModalDetalheAtividade
                    atividade={atividadeSelecionada}
                    onClose={() => setAtividadeSelecionada(null)}
                    isProfessor
                  />
                )}
              </AnimatePresence>
            </AnimacaoEntrada>
          )}

          {abaAtiva === "avisos" && (
            <AnimacaoEntrada key="avisos">
              <h2 className="text-5xl font-bold text-indigo-300 mb-8">Avisos</h2>
              <section className="grid gap-8">
                {avisos.length === 0 ? (
                  <p className="text-xl text-indigo-200">Nenhum aviso encontrado.</p>
                ) : (
                  avisos.map((aviso) => (
                    <CardAviso
                      key={aviso.id}
                      aviso={aviso}
                      isProfessor
                      onDelete={() => excluirAviso?.(aviso.id)}
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

          {abaAtiva === "alunos" && (
            <AnimacaoEntrada key="alunos">
              <h2 className="text-5xl font-bold text-indigo-300 mb-8">Participantes</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <li className="bg-gray-800 px-6 py-5 rounded-xl shadow-md hover:shadow-indigo-500/10 transition-all">
                  <div className="text-lg font-medium mb-1">{professor?.nomeCompleto}</div>
                  <div className="text-sm text-indigo-300">Professor(a)</div>
                </li>
                {colegas.map((pessoa) => (
                  <li
                    key={pessoa.id}
                    className="bg-gray-800 px-6 py-5 rounded-xl shadow-md hover:shadow-indigo-500/20 hover:bg-gray-700 hover:scale-[1.02] transition-all duration-200 ease-in-out flex justify-between items-center"
                >
                    <div>
                      <div className="text-lg font-medium mb-1">{pessoa.nomeCompleto}</div>
                      <div className="text-sm text-indigo-300">Aluno(a)</div>
                    </div>
                    <button
                        onClick={() => removerAluno(pessoa.id)}
                        className="text-red-500 hover:text-red-300 text-xl"
                        title="Remover aluno"
                        >
                        <FaTrash />
                    </button>
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
