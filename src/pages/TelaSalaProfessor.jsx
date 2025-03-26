import React, { useState } from "react";
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
import ModalCriarAtividade from "../components/modals/ModalCriarAtividade";
import ModalEditarAtividade from "../components/modals/ModalEditarAtividade";
import ModalConfirmarExclusao from "../components/modals/ModalConfirmarExclusao";
import ModalEditarAviso from "../components/modals/ModalEditarAviso";
import ModalCriarAviso from "../components/modals/ModalCriarAviso";
import { FaTrash } from "react-icons/fa";

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
  

  const [mostrarModalCriarAtividade, setMostrarModalCriarAtividade] = useState(false);
  const [mostrarModalCriarAviso, setMostrarModalCriarAviso] = useState(false);
  const [atividadeEditando, setAtividadeEditando] = useState(null);
  const [atividadeExcluindo, setAtividadeExcluindo] = useState(null);
  const [avisoEditando, setAvisoEditando] = useState(null);
  const [avisoExcluindo, setAvisoExcluindo] = useState(null);
  const [alunoRemovendo, setAlunoRemovendo] = useState(null);

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

  const { nome: nomeSala, codigoAcesso, atividades = [], avisos = [], alunos = [], professor } = dados;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header nomeSala={nomeSala} codigoAcesso={codigoAcesso} />

      <TabsAluno tabs={tabs} abaAtiva={abaAtiva} onChange={setAbaAtiva} />

      <main className="flex-grow p-10 max-w-6xl w-full mx-auto">
        <AnimatePresence>
          {mensagemSucesso && (
            <AlertaMensagem mensagem={mensagemSucesso} tipo="sucesso" />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {abaAtiva === "atividades" && (
            <AnimacaoEntrada key="atividades">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-5xl font-bold text-indigo-300">Atividades</h2>
                <button
                  onClick={() => setMostrarModalCriarAtividade(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2 rounded-xl transition duration-200"
                >
                  + Criar Atividade
                </button>
              </div>
              <section className="grid sm:grid-cols-2 gap-6">
                {atividades.length === 0 ? (
                  <p className="text-xl text-indigo-200">Nenhuma atividade encontrada.</p>
                ) : (
                  atividades.map((atividade) => (
                    <CardAtividade
                      key={atividade.id}
                      atividade={atividade}
                      isProfessor
                      onClick={() => selecionarAtividade(atividade)}
                      onEdit={() => setAtividadeEditando(atividade)}
                      onDelete={() => setAtividadeExcluindo(atividade)}
                    />
                  ))
                )}
              </section>
              <AnimatePresence>
                {atividadeSelecionada && (
                  <ModalDetalheAtividade
                  atividade={atividadeSelecionada}
                  onClose={() => {
                    setAtividadeSelecionada(null);
                  }}
                  isProfessor
                  resumo={resumoAtividade}
                />
                )}
              </AnimatePresence>
              {mostrarModalCriarAtividade && (
                <ModalCriarAtividade
                  onClose={() => setMostrarModalCriarAtividade(false)}
                  onSucesso={(mensagem) => {
                    setMensagemSucesso(mensagem);
                    setTimeout(() => setMensagemSucesso(null), 3000);
                    atualizarSala();
                  }}
                />
              )}
              {atividadeEditando && (
                <ModalEditarAtividade
                  atividade={atividadeEditando}
                  onClose={() => setAtividadeEditando(null)}
                  onSalvar={editarAtividade}
                />
              )}
              {atividadeExcluindo && (
                <ModalConfirmarExclusao
                  titulo="Excluir Atividade"
                  mensagem={`Deseja realmente excluir a atividade "${atividadeExcluindo.titulo}"?`}
                  onClose={() => setAtividadeExcluindo(null)}
                  onConfirm={() => {
                    excluirAtividade(atividadeExcluindo.id);
                    setMensagemSucesso("Atividade excluída com sucesso!");
                    setTimeout(() => setMensagemSucesso(null), 3000);
                    setAtividadeExcluindo(null);
                  }}
                />
              )}
            </AnimacaoEntrada>
          )}

          {abaAtiva === "avisos" && (
            <AnimacaoEntrada key="avisos">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-5xl font-bold text-indigo-300">Avisos</h2>
                <button
                  onClick={() => setMostrarModalCriarAviso(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2 rounded-xl transition duration-200"
                >
                  + Criar Aviso
                </button>
              </div>
              <section className="grid sm:grid-cols-2 gap-6">
                {avisos.length === 0 ? (
                  <p className="text-xl text-indigo-200">Nenhum aviso encontrado.</p>
                ) : (
                  avisos.map((aviso) => (
                    <CardAviso
                      key={aviso.id}
                      aviso={aviso}
                      isProfessor
                      onClick={() => setAvisoSelecionado(aviso)}
                      onEdit={() => setAvisoEditando(aviso)}
                      onDelete={() => setAvisoExcluindo(aviso)}
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
              {mostrarModalCriarAviso && (
                <ModalCriarAviso
                  onClose={() => setMostrarModalCriarAviso(false)}
                  onSucesso={(mensagem) => {
                    setMensagemSucesso(mensagem);
                    setTimeout(() => setMensagemSucesso(null), 3000);
                    atualizarSala();
                  }}
                />
              )}
              {avisoEditando && (
                <ModalEditarAviso
                  aviso={avisoEditando}
                  onClose={() => setAvisoEditando(null)}
                  onSalvar={editarAviso}
                />
              )}
              {avisoExcluindo && (
                <ModalConfirmarExclusao
                  titulo="Excluir Aviso"
                  mensagem={`Deseja realmente excluir o aviso "${avisoExcluindo.titulo}"?`}
                  onClose={() => setAvisoExcluindo(null)}
                  onConfirm={() => {
                    excluirAviso(avisoExcluindo.id);
                    setMensagemSucesso("Aviso excluído com sucesso!");
                    setTimeout(() => setMensagemSucesso(null), 3000);
                    setAvisoExcluindo(null);
                  }}
                />
              )}
            </AnimacaoEntrada>
          )}

          {abaAtiva === "alunos" && (
            <AnimacaoEntrada key="alunos">
              <h2 className="text-5xl font-bold text-indigo-300 mb-8">
                  Alunos <span className="text-indigo-400 text-2xl">({alunos.length + 1})</span>
                </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Card do professor */}
                <li className="bg-gray-800 px-6 py-6 min-h-[120px] rounded-2xl shadow-md hover:shadow-indigo-500/20 hover:bg-gray-700 hover:scale-[1.02] transition-all duration-200 ease-in-out">
                  <div className="text-xl font-semibold text-white mb-1 break-words">
                    {professor?.nomeCompleto}
                  </div>
                  <div className="text-sm text-indigo-300">Professor(a)</div>
                </li>

                {/* Cards dos alunos */}
                {alunos.map((pessoa) => (
                  <li
                    key={pessoa.id}
                    className="bg-gray-800 px-6 py-6 min-h-[120px] rounded-2xl shadow-md hover:shadow-indigo-500/20 hover:bg-gray-700 hover:scale-[1.02] transition-all duration-200 ease-in-out flex justify-between items-start"
                  >
                    <div className="pr-4">
                      <div className="text-xl font-semibold text-white mb-1 break-words">
                        {pessoa.nomeCompleto}
                      </div>
                      <div className="text-sm text-indigo-300">Aluno(a)</div>
                    </div>
                    <button
                      onClick={() => setAlunoRemovendo(pessoa)}
                      className="text-red-500 hover:text-red-300 text-xl mt-1"
                      title="Remover aluno"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Modal de confirmação para remover aluno */}
              {alunoRemovendo && (
                <ModalConfirmarExclusao
                  titulo="Remover Aluno"
                  mensagem={`Deseja realmente remover o aluno "${alunoRemovendo.nomeCompleto}" da sala?`}
                  onClose={() => setAlunoRemovendo(null)}
                  onConfirm={async () => {
                    await removerAluno(alunoRemovendo.id);
                    setMensagemSucesso("Aluno removido com sucesso!");
                    setTimeout(() => setMensagemSucesso(null), 3000);
                    setAlunoRemovendo(null);
                  }}
                />
              )}
            </AnimacaoEntrada>
          )}

        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
