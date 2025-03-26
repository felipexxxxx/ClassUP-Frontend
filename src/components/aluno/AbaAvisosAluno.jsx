import React from "react";
import CardAviso from "../shared/CardAviso";
import ModalDetalheAviso from "../modals/ModalDetalheAviso";
import { AnimatePresence } from "framer-motion";

export default function AbaAvisosAluno({
  avisos = [],
  avisoSelecionado,
  setAvisoSelecionado,
}) {
  return (
    <>
      <h2 className="text-5xl font-bold text-indigo-300 mb-8">Avisos</h2>
      <section className="grid sm:grid-cols-2 gap-6">
        {avisos.length === 0 ? (
          <p className="text-xl text-indigo-200">Nenhum aviso encontrado.</p>
        ) : (
          avisos.map((aviso) => (
            <CardAviso
              key={aviso.id}
              aviso={aviso}
              isProfessor={false}
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
    </>
  );
}
