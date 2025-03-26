import React from "react";
import CardAviso from "../shared/CardAviso";
import ModalDetalheAviso from "../modals/ModalDetalheAviso";
import ModalCriarAviso from "../modals/ModalCriarAviso";
import ModalEditarAviso from "../modals/ModalEditarAviso";
import ModalConfirmarExclusao from "../modals/ModalConfirmarExclusao";
import { AnimatePresence } from "framer-motion";

export default function AbaAvisosProfessor({
  dados,
  avisoSelecionado,
  setAvisoSelecionado,
  modais,
  setModais,
  editarAviso,
  excluirAviso,
  setMensagemSucesso,
  atualizarSala
}) {
  const { avisos = [] } = dados;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-5xl font-bold text-indigo-300">Avisos</h2>
        <button
          onClick={() => setModais({ ...modais, criarAviso: true })}
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
              onEdit={() => setModais({ ...modais, avisoEditando: aviso })}
              onDelete={() => setModais({ ...modais, avisoExcluindo: aviso })}
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

      {modais.criarAviso && (
        <ModalCriarAviso
          onClose={() => setModais({ ...modais, criarAviso: false })}
          onSucesso={(msg) => {
            setMensagemSucesso(msg);
            setTimeout(() => setMensagemSucesso(null), 3000);
            atualizarSala();
          }}
        />
      )}

      {modais.avisoEditando && (
        <ModalEditarAviso
          aviso={modais.avisoEditando}
          onClose={() => setModais({ ...modais, avisoEditando: null })}
          onSalvar={editarAviso}
        />
      )}

      {modais.avisoExcluindo && (
        <ModalConfirmarExclusao
          titulo="Excluir Aviso"
          mensagem={`Deseja realmente excluir o aviso "${modais.avisoExcluindo.titulo}"?`}
          onClose={() => setModais({ ...modais, avisoExcluindo: null })}
          onConfirm={() => {
            excluirAviso(modais.avisoExcluindo.id);
            setMensagemSucesso("Aviso excluído com sucesso!");
            setTimeout(() => setMensagemSucesso(null), 3000);
            setModais({ ...modais, avisoExcluindo: null });
          }}
        />
      )}
    </>
  );
}
