import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AnimacaoEntrada from "../components/shared/AnimacaoEntrada";
import { motion } from "framer-motion";
import usePainelProfessor from "../hooks/usePainelProfessor";

export default function TelaPainelProfessor() {
  const navigate = useNavigate();
  const { salas, carregando } = usePainelProfessor();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-grow p-10 max-w-7xl w-full mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-5xl font-bold text-indigo-300">Suas Salas</h2>
          <button
            onClick={() => navigate("/criar-sala")}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded text-white font-semibold shadow"
          >
            Criar nova sala
          </button>
        </div>

        {carregando ? (
          <p className="text-indigo-200">Carregando salas...</p>
        ) : salas.length === 0 ? (
          <p className="text-indigo-200">Nenhuma sala encontrada.</p>
        ) : (
          <AnimacaoEntrada>
            <section className="grid gap-8">
              {salas.map((sala) => (
                <motion.div
                  key={sala.id}
                  onClick={() => navigate(`/sala/${sala.id}`)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer bg-gray-800 px-6 py-6 rounded-2xl shadow-xl hover:shadow-indigo-500/10 transition-all"
                >
                  <h3 className="text-2xl font-bold text-indigo-300 mb-2">{sala.nome}</h3>
                  <p className="text-gray-300">
                    Código de acesso:{" "}
                    <span className="text-indigo-100 font-mono">
                      {sala.codigoAcesso}
                    </span>
                  </p>
                </motion.div>
              ))}
            </section>
          </AnimacaoEntrada>
        )}
      </main>

      <Footer />
    </div>
  );
}
