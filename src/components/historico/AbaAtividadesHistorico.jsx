import React from "react";
import CardAtividade from "../shared/CardAtividade";
import ModalDetalheAtividade from "../modals/ModalDetalheAtividade";

export default function AbaAtividadesHistorico({ atividades, atividadeSelecionada, setAtividadeSelecionada }) {
  return (
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
              modoSomenteLeitura
            />
          ))
        )}
      </section>

      {atividadeSelecionada && (
        <ModalDetalheAtividade
          atividade={atividadeSelecionada}
          onClose={() => setAtividadeSelecionada(null)}
          modoSomenteLeitura
        />
      )}
    </>
  );
}
