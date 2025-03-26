import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AnimacaoEntrada from "../components/shared/AnimacaoEntrada";
import { motion, AnimatePresence } from "framer-motion";
import usePainelProfessor from "../hooks/usePainelProfessor";
import { criarSala, encerrarSemestre } from "../services/professorService";
import ModalCriarSala from "../components/modals/ModalCriarSala";
import ModalEncerrarSemestre from "../components/modals/ModalEncerrarSemestre";

export default function TelaPainelProfessor() {
  const navigate = useNavigate();
  const { salas, carregando, atualizarSalas } = usePainelProfessor();

  const [nomeNovaSala, setNomeNovaSala] = useState("");
  const [mostrarModalCriar, setMostrarModalCriar] = useState(false);
  const [mostrarModalEncerrar, setMostrarModalEncerrar] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    if (mensagemSucesso || mensagemErro) {
      const timer = setTimeout(() => {
        setMensagemSucesso("");
        setMensagemErro("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagemSucesso, mensagemErro]);

  const criarNovaSala = async () => {
    try {
      await criarSala(nomeNovaSala);
      setMostrarModalCriar(false);
      setNomeNovaSala("");
      atualizarSalas();
      setMensagemErro("");
      setMensagemSucesso("Sala criada com sucesso!");
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Erro ao criar sala. Tente novamente.";
      setMensagemSucesso("");
      setMensagemErro(msg);
    }
  };

  const confirmarEncerramento = async () => {
    try {
      await encerrarSemestre();
      setMostrarModalEncerrar(false);
      atualizarSalas();
      setMensagemErro("");
      setMensagemSucesso("Semestre encerrado com sucesso!");
    } catch (error) {
      setMensagemSucesso("");
      setMensagemErro("Erro ao encerrar semestre.");
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
              className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-2xl text-white font-semibold shadow-md transition-all tracking-wide"
            >
              + Criar nova sala
            </button>

            <button
              onClick={() => setMostrarModalEncerrar(true)}
              className="bg-red-900 hover:bg-red-700 px-6 py-2 rounded-2xl text-white font-semibold shadow-md transition-all tracking-wide"
            >
              Encerrar semestre
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mensagemSucesso && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 bg-green-700 text-white text-center py-2 px-4 rounded shadow"
            >
              {mensagemSucesso}
            </motion.div>
          )}
          {mensagemErro && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 bg-red-600 text-white text-center py-2 px-4 rounded shadow"
            >
              {mensagemErro}
            </motion.div>
          )}
        </AnimatePresence>

        {carregando ? (
          <p className="text-indigo-200">Carregando salas...</p>
        ) : salas.length === 0 ? (
          <p className="text-2xl text-indigo-200">Nenhuma sala encontrada.</p>
        ) : (
          <AnimacaoEntrada>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {salas.map((sala) => (
                <motion.div
                  key={sala.id}
                  onClick={() => navigate(`/sala/${sala.id}`)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer bg-gray-800 px-6 py-6 rounded-2xl shadow-md hover:shadow-indigo-500/20 hover:bg-gray-700 transition-all relative"
                >
                  <h3 className="text-2xl font-bold text-indigo-300 mb-2">
                    {sala.nome}
                  </h3>
                  <p className="text-xl font-mono text-gray-400">
                    Código de acesso:{" "}
                    <span className="text-indigo-300">
                      {sala.codigoAcesso}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(sala.codigoAcesso);
                          setMensagemSucesso("Código copiado com sucesso!");
                        }}
                        className="text-md text-indigo-400 hover:text-white underline ml-2"
                      >
                        Copiar
                      </button>
                    </span>
                  </p>
                </motion.div>
              ))}
            </section>
          </AnimacaoEntrada>
        )}
      </main>

      {mostrarModalCriar && (
        <ModalCriarSala
          nomeNovaSala={nomeNovaSala}
          setNomeNovaSala={setNomeNovaSala}
          onClose={() => setMostrarModalCriar(false)}
          onConfirmar={criarNovaSala}
        />
      )}

      {mostrarModalEncerrar && (
        <ModalEncerrarSemestre
          onClose={() => setMostrarModalEncerrar(false)}
          onConfirmar={confirmarEncerramento}
        />
      )}

      <Footer />
    </div>
  );
}
