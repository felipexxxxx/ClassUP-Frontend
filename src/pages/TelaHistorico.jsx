import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AnimacaoEntrada from "../components/shared/AnimacaoEntrada";
import useHistorico from "../hooks/useHistorico";
import CardHistorico from "../components/shared/CardHistorico";


export default function TelaHistorico() {
  const navigate = useNavigate();
  const { historico, carregando } = useHistorico();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-grow p-10 max-w-2xl w-full mx-auto">
        <h2 className="text-6xl font-bold text-center text-indigo-300 mb-10">Histórico de Salas</h2>

        {carregando ? (
          <p className="text-indigo-200">Carregando...</p>
        ) : historico.length === 0 ? (
          <p className="text-2xl text-center text-indigo-200">Nenhuma sala encontrada.</p>
        ) : (
          <AnimacaoEntrada>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {historico.map((item) => (
                <CardHistorico key={item.id} historico={item} />
                ))}
              </section>
          </AnimacaoEntrada>


        )}
      </main>

      <Footer />
    </div>
  );
}
