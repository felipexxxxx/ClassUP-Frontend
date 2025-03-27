import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import usePerfil from "../hooks/usePerfil";

export default function TelaPerfil() {
  const {
    perfil,
    mostraEmail,
    mostraSenha,
    mensagemSucesso,
    erroEmail,
    erroSenha,
    setMostraEmail,
    setMostraSenha,
    atualizarEmail,
    atualizarSenha,
    atualizarFoto,
  } = usePerfil();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-grow p-10 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-indigo-300 mb-10 text-center">
          Meu Perfil
        </h2>

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
        </AnimatePresence>

        <div className="flex flex-col items-center mb-10 relative group">
          <label htmlFor="fotoPerfil" className="relative cursor-pointer group">
            <img
              src={localStorage.getItem("fotoPerfil") || "https://via.placeholder.com/150"}
              alt="Foto de Perfil"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-full transition">
              <span className="text-white text-sm font-medium">Alterar</span>
            </div>
          </label>
          <input
            id="fotoPerfil"
            type="file"
            accept="image/*"
            onChange={(e) => atualizarFoto(e.target.files[0])}
            className="hidden"
          />
          <p className="text-sm text-gray-400 mt-2">Clique na foto para alterar</p>
        </div>

        {/* Usuário */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
          <p className="text-xl mb-2">
            <strong className="text-white">Nome:</strong> {perfil.nomeCompleto}
          </p>
          <p className="text-xl mb-2 flex items-center gap-3">
            <span>
              <strong className="text-white">Email:</strong> {perfil.email}
            </span>
            <button
              onClick={() => setMostraEmail(true)}
              className="text-sm text-indigo-400 hover:underline"
            >
              (Alterar email)
            </button>
          </p>
          <p className="text-xl mb-2">
            <strong className="text-white">Matrícula:</strong> {perfil.matricula}
          </p>
          <button
            onClick={() => setMostraSenha(true)}
            className="text-sm text-indigo-400 hover:underline mt-2"
          >
            Redefinir Senha
          </button>
        </div>

        <AnimatePresence>
          {mostraEmail && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMostraEmail(false)}
            >
              <motion.form
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => {
                  e.preventDefault();
                  const novoEmail = e.target.novoEmail.value;
                  atualizarEmail(novoEmail);
                }}
                className="bg-gray-800 p-6 rounded-xl w-full max-w-md"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-indigo-300">Alterar Email</h3>
                <input
                  name="novoEmail"
                  type="email"
                  required
                  placeholder="Novo email"
                  className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
                />
                {erroEmail && <p className="text-red-400 text-sm mb-3">{erroEmail}</p>}
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white font-semibold w-full"
                >
                  Atualizar
                </button>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mostraSenha && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMostraSenha(false)}
            >
              <motion.form
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => {
                  e.preventDefault();
                  const senhaAtual = e.target.senhaAtual.value;
                  const novaSenha = e.target.novaSenha.value;
                  atualizarSenha(senhaAtual, novaSenha);
                  e.target.reset();
                }}
                className="bg-gray-800 p-6 rounded-xl w-full max-w-md"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-indigo-300">Redefinir Senha</h3>
                <input
                  name="senhaAtual"
                  type="password"
                  required
                  placeholder="Senha atual"
                  className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
                />
                <input
                  name="novaSenha"
                  type="password"
                  required
                  placeholder="Nova senha"
                  className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
                />
                {erroSenha && <p className="text-red-400 text-sm mb-3">{erroSenha}</p>}
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white font-semibold w-full"
                >
                  Atualizar Senha
                </button>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
