import React from "react";
import CardAviso from "../shared/CardAviso";
import ModalDetalheAviso from "../modals/ModalDetalheAviso";
import formatarData from "../../utils/formatarData";

export default function AbaAvisosHistorico({ avisos, avisoSelecionado, setAvisoSelecionado }) {
  return (
    <>
      <h2 className="text-5xl font-bold text-indigo-300 mb-8">Avisos</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {avisos.length === 0 ? (
          <p className="text-2xl text-indigo-200">Nenhum aviso encontrado.</p>
        ) : (
          avisos.map((aviso) => (
            <CardAviso
              key={aviso.id}
              aviso={{ ...aviso, enviadaEmFormatada: formatarData(aviso.enviadaEm) }}
              onClick={() => setAvisoSelecionado(aviso)}
            />
          ))
        )}
      </section>

      {avisoSelecionado && (
        <ModalDetalheAviso aviso={avisoSelecionado} onClose={() => setAvisoSelecionado(null)} />
      )}
    </>
  );
}
