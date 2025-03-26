import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { AnimatePresence, motion } from "framer-motion";
import TabsAluno from "../components/shared/TabsAluno";
import AnimacaoEntrada from "../components/shared/AnimacaoEntrada";
import useSalaProfessor from "../hooks/useSalaProfessor";

import AbaAtividadesProfessor from "../components/professor/AbaAtividadesProfessor";
import AbaAvisosProfessor from "../components/professor/AbaAvisosProfessor";
import AbaAlunosProfessor from "../components/professor/AbaAlunosProfessor";
import ModalCriarAtividade from "../components/modals/ModalCriarAtividade";
import ModalCriarAviso from "../components/modals/ModalCriarAviso";

export default function TelaSalaProfessor() {
  const {
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
  } = useSalaProfessor();

  const [modais, setModais] = useState({
    criarAtividade: false,
    atividadeEditando: null,
    atividadeExcluindo: null,
    criarAviso: false,
    avisoEditando: null,
    avisoExcluindo: null,
    alunoRemovendo: null,
  });

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

  const { nome: nomeSala, codigoAcesso } = dados;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header nomeSala={nomeSala} codigoAcesso={codigoAcesso} />
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
              <AbaAtividadesProfessor
                dados={dados}
                resumoAtividade={resumoAtividade}
                selecionarAtividade={selecionarAtividade}
                atividadeSelecionada={atividadeSelecionada}
                setAtividadeSelecionada={setAtividadeSelecionada}
                modais={modais}
                setModais={setModais}
                editarAtividade={editarAtividade}
                excluirAtividade={excluirAtividade}
                setMensagemSucesso={setMensagemSucesso}
                atualizarSala={atualizarSala}
              />
              {modais.criarAtividade && (
                <ModalCriarAtividade
                  onClose={() => setModais((prev) => ({ ...prev, criarAtividade: false }))}
                  onSucesso={(mensagem) => {
                    setMensagemSucesso(mensagem);
                    atualizarSala();
                    setTimeout(() => setMensagemSucesso(null), 3000);
                  }}
                />
              )}
            </AnimacaoEntrada>
          )}

          {abaAtiva === "avisos" && (
            <AnimacaoEntrada key="avisos">
              <AbaAvisosProfessor
                dados={dados}
                avisoSelecionado={avisoSelecionado}
                setAvisoSelecionado={setAvisoSelecionado}
                modais={modais}
                setModais={setModais}
                editarAviso={editarAviso}
                excluirAviso={excluirAviso}
                setMensagemSucesso={setMensagemSucesso}
                atualizarSala={atualizarSala}
              />
              {modais.criarAviso && (
                <ModalCriarAviso
                  onClose={() => setModais((prev) => ({ ...prev, criarAviso: false }))}
                  onSucesso={(mensagem) => {
                    setMensagemSucesso(mensagem);
                    atualizarSala();
                    setTimeout(() => setMensagemSucesso(null), 3000);
                  }}
                />
              )}
            </AnimacaoEntrada>
          )}

          {abaAtiva === "alunos" && (
            <AnimacaoEntrada key="alunos">
              <AbaAlunosProfessor
                dados={dados}
                modais={modais}
                setModais={setModais}
                removerAluno={removerAluno}
                setMensagemSucesso={setMensagemSucesso}
              />
            </AnimacaoEntrada>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
