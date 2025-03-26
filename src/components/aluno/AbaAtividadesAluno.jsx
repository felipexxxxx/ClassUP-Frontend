import React from "react";
import CardAtividade from "../shared/CardAtividade";
import ModalDetalheAtividade from "../modals/ModalDetalheAtividade";
import { AnimatePresence } from "framer-motion";

export default function AbaAtividadesAluno({
  atividades = [],
  atividadeSelecionada,
  setAtividadeSelecionada,
  confirmarPresenca,
  cancelarPresenca,
  bloqueado
}) {
  return (
    <>
      <h2 className="text-5xl font-bold text-indigo-300 mb-8">Atividades</h2>
      <section className="grid sm:grid-cols-2 gap-6">
        {atividades.length === 0 ? (
          <p className="text-xl text-indigo-200">Nenhuma atividade encontrada.</p>
        ) : (
          atividades.map((atividade) => (
            <CardAtividade
              key={atividade.id}
              atividade={{ ...atividade, dataHora: atividade.data }}
              isProfessor={false}
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
            isProfessor={false}
          />
        )}
      </AnimatePresence>
    </>
  );
}
