import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AnimacaoEntrada from "../components/shared/AnimacaoEntrada";
import { motion } from "framer-motion";
import usePainelProfessor from "../hooks/usePainelProfessor";
import { criarSala, encerrarSemestre } from "../services/professorService";
import { FaExclamationTriangle } from "react-icons/fa";

export default function TelaPainelProfessor() {
  const navigate = useNavigate();
  const { salas, carregando, atualizarSalas } = usePainelProfessor();

  const [nomeNovaSala, setNomeNovaSala] = useState("");
  const [mostrarModalCriar, setMostrarModalCriar] = useState(false);
  const [mostrarModalEncerrar, setMostrarModalEncerrar] = useState(false);

  const criarNovaSala = async () => {
    try {
      await criarSala(nomeNovaSala);
      setMostrarModalCriar(false);
      setNomeNovaSala("");
      atualizarSalas();
    } catch (error) {
      console.error("Erro ao criar sala:", error);
    }
  };

  const confirmarEncerramento = async () => {
    try {
      await encerrarSemestre();
      setMostrarModalEncerrar(false);
      atualizarSalas();
    } catch (error) {
      console.error("Erro ao encerrar semestre:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-grow p-10 max-w-7xl w-full mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-5xl font-bold text-indigo-300">Suas Salas</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setMostrarModalCriar(true)}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded text-white font-semibold shadow transition-all"
            >
              Criar nova sala
            </button>
            <button
              onClick={() => setMostrarModalEncerrar(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold shadow transition-all"
            >
              <FaExclamationTriangle />
              Encerrar semestre
            </button>
          </div>
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
                    <span className="text-indigo-100 font-mono">{sala.codigoAcesso}</span>
                  </p>
                </motion.div>
              ))}
            </section>
          </AnimacaoEntrada>
        )}
      </main>

      {/* Modal Criar Sala */}
      {mostrarModalCriar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setMostrarModalCriar(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
          >
            <h3 className="text-2xl font-bold text-indigo-300 mb-4">Criar nova sala</h3>
            <input
              value={nomeNovaSala}
              onChange={(e) => setNomeNovaSala(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded bg-gray-900 text-white border border-indigo-500"
              placeholder="Digite o nome da sala"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarModalCriar(false)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
              >
                Cancelar
              </button>
              <button
                onClick={criarNovaSala}
                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Encerrar Semestre */}
      {mostrarModalEncerrar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setMostrarModalEncerrar(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
          >
            <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
              <FaExclamationTriangle /> Confirmar encerramento
            </h3>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja encerrar o semestre? Todas as suas salas ativas serão
              encerradas e movidas para o histórico.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarModalEncerrar(false)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEncerramento}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Sim, encerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
