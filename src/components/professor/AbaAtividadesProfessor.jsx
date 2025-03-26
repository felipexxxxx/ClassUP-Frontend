import React from "react";
import CardAtividade from "../shared/CardAtividade";
import ModalDetalheAtividade from "../modals/ModalDetalheAtividade";
import ModalCriarAtividade from "../modals/ModalCriarAtividade";
import ModalEditarAtividade from "../modals/ModalEditarAtividade";
import ModalConfirmarExclusao from "../modals/ModalConfirmarExclusao";
import { AnimatePresence } from "framer-motion";

export default function AbaAtividadesProfessor({
  dados,
  resumoAtividade,
  selecionarAtividade,
  atividadeSelecionada,
  setAtividadeSelecionada,
  modais,
  setModais,
  editarAtividade,
  excluirAtividade,
  setMensagemSucesso,
  atualizarSala
}) {
  const { atividades = [] } = dados;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-5xl font-bold text-indigo-300">Atividades</h2>
        <button
          onClick={() => setModais({ ...modais, criarAtividade: true })}
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
              onEdit={() => setModais({ ...modais, atividadeEditando: atividade })}
              onDelete={() => setModais({ ...modais, atividadeExcluindo: atividade })}
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
            resumo={resumoAtividade}
          />
        )}
      </AnimatePresence>

      {modais.criarAtividade && (
        <ModalCriarAtividade
          onClose={() => setModais({ ...modais, criarAtividade: false })}
          onSucesso={(msg) => {
            setMensagemSucesso(msg);
            setTimeout(() => setMensagemSucesso(null), 3000);
            atualizarSala();
          }}
        />
      )}

      {modais.atividadeEditando && (
        <ModalEditarAtividade
          atividade={modais.atividadeEditando}
          onClose={() => setModais({ ...modais, atividadeEditando: null })}
          onSalvar={editarAtividade}
        />
      )}

      {modais.atividadeExcluindo && (
        <ModalConfirmarExclusao
          titulo="Excluir Atividade"
          mensagem={`Deseja realmente excluir a atividade "${modais.atividadeExcluindo.titulo}"?`}
          onClose={() => setModais({ ...modais, atividadeExcluindo: null })}
          onConfirm={() => {
            excluirAtividade(modais.atividadeExcluindo.id);
            setMensagemSucesso("Atividade excluída com sucesso!");
            setTimeout(() => setMensagemSucesso(null), 3000);
            setModais({ ...modais, atividadeExcluindo: null });
          }}
        />
      )}
    </>
  );
}
