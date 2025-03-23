import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import useAlunoSala from "../hooks/useAlunoSala";
import AlertaMensagem from "../components/shared/AlertaMensagem";
import CardAtividade from "../components/shared/CardAtividade";
import ModalDetalheAtividade from "../components/shared/ModalDetalheAtividade";
import TabsAluno from "../components/shared/TabsAluno";

export default function TelaAlunoSala() {
  const {
    perfil,
    nomeSala,
    atividades,
    colegas,
    mensagemSucesso,
    atividadeSelecionada,
    setAtividadeSelecionada,
    confirmarPresenca,
    cancelarPresenca,
  } = useAlunoSala();

  const tabs = [
    { id: "atividades", label: "Atividades" },
    { id: "colegas", label: "Colegas" },
  ];

  const [abaAtiva, setAbaAtiva] = React.useState("atividades");

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header nomeSala={nomeSala} />

      <TabsAluno tabs={tabs} abaAtiva={abaAtiva} onChange={setAbaAtiva} />

      <main className="flex-grow p-10 max-w-7xl w-full mx-auto">
        <AnimatePresence>
          {mensagemSucesso && (
            <AlertaMensagem mensagem={mensagemSucesso} tipo="sucesso" />
          )}
        </AnimatePresence>

        {abaAtiva === "atividades" && (
          <>
            <h2 className="text-5xl font-bold text-indigo-300 mb-8">Atividades</h2>
            <section className="grid gap-8">
              {atividades.map((atividade) => (
                <CardAtividade
                  key={atividade.id}
                  atividade={atividade}
                  onClick={() => setAtividadeSelecionada(atividade)}
                />
              ))}
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
          </>
        )}

        {abaAtiva === "colegas" && (
          <>
            <h2 className="text-4xl font-bold text-indigo-300 mt-10 mb-6">Colegas de Sala</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {colegas.map((pessoa, idx) => (
                <li
                  key={idx}
                  className="bg-gray-800 px-6 py-5 rounded-xl shadow-md hover:shadow-indigo-500/10 transition-all"
                >
                  <div className="text-lg text-white font-medium mb-1">{pessoa.nome}</div>
                  <div className="text-sm text-indigo-300">
                    {pessoa.id === perfil.id
                      ? "Você"
                      : idx === 0
                      ? "Professor(a)"
                      : "Aluno(a)"}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
