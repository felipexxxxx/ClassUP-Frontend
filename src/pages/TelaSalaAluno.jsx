import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TabsAluno from "../components/shared/TabsAluno";
import { AnimatePresence, motion } from "framer-motion";
import AnimacaoEntrada from "../components/shared/AnimacaoEntrada";
import useAlunoSala from "../hooks/useAlunoSala";

import AbaAtividadesAluno from "../components/aluno/AbaAtividadesAluno";
import AbaAvisosAluno from "../components/aluno/AbaAvisosAluno";
import AbaAlunosAluno from "../components/aluno/AbaAlunosAluno";
import ModalDetalheAtividade from "../components/modals/ModalDetalheAtividade";

export default function TelaAlunoSala() {
  const {
    perfil,
    nomeSala,
    atividades,
    avisos,
    mensagemSucesso,
    setMensagemSucesso,
    atividadeSelecionada,
    setAtividadeSelecionada,
    avisoSelecionado,
    setAvisoSelecionado,
    confirmarPresenca,
    cancelarPresenca,
    bloqueado,
    colegas,
  } = useAlunoSala();

  const professor = colegas?.[0];
  const alunos = colegas?.slice(1) || [];

  const tabs = [
    { id: "atividades", label: "Atividades" },
    { id: "avisos", label: "Avisos" },
    { id: "colegas", label: "Colegas" }
  ];

  const [abaAtiva, setAbaAtiva] = useState("atividades");

  useEffect(() => {
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
              <AbaAtividadesAluno
                atividades={atividades}
                atividadeSelecionada={atividadeSelecionada}
                setAtividadeSelecionada={setAtividadeSelecionada}
                confirmarPresenca={confirmarPresenca}
                cancelarPresenca={cancelarPresenca}
                bloqueado={bloqueado}
              />
            </AnimacaoEntrada>
          )}

          {abaAtiva === "avisos" && (
            <AnimacaoEntrada key="avisos">
              <AbaAvisosAluno
                avisos={avisos}
                avisoSelecionado={avisoSelecionado}
                setAvisoSelecionado={setAvisoSelecionado}
              />
            </AnimacaoEntrada>
          )}

          {abaAtiva === "colegas" && (
            <AnimacaoEntrada key="colegas">
              <AbaAlunosAluno
                alunos={alunos}
                professor={professor}
              />
            </AnimacaoEntrada>
          )}
        </AnimatePresence>
      </main>

      {/* Modal de Detalhes da Atividade */}
      {atividadeSelecionada && (
        <ModalDetalheAtividade
          atividade={atividadeSelecionada}
          onClose={() => setAtividadeSelecionada(null)}
          onConfirmar={() => confirmarPresenca(atividadeSelecionada.id)}
          onCancelar={() => cancelarPresenca(atividadeSelecionada.id)}
          modoSomenteLeitura={false}
          isProfessor={false}
        />
      )}

      <Footer />
    </div>
  );
}
