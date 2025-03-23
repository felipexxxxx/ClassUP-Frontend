import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TelaAcessoSala() {
  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  const handleEntrar = async () => {
    setMensagem("");

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/sala/entrar",
        { codigoAcesso: codigo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagem("Você entrou na sala com sucesso!");
      setSucesso(true);

      setTimeout(() => {
        navigate("/aluno/sala");
      }, 1500);
    } catch (error) {
      console.error(error);
      setMensagem("Código inválido. Verifique com o professor.");
      setSucesso(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header exibirSala={false} />

      <main className="flex flex-col items-center justify-center flex-grow px-4 py-10">
        <motion.p
          className="text-center mb-12 text-3xl font-medium text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Ops! Parece que você ainda não está em nenhuma sala{" "}
          <span className="text-yellow-400">😕</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 text-white p-10 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-indigo-400">
            Entrar em uma Sala
          </h2>

          <label className="block mb-2 text-sm font-semibold text-gray-300">
            Código da Sala
          </label>
          <input
            type="text"
            placeholder="Digite o código fornecido"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleEntrar}
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded font-semibold transition duration-200"
          >
            Entrar na Sala
          </button>

          <AnimatePresence>
            {mensagem && (
              <motion.p
                key="feedback"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`mt-4 text-sm text-center ${
                  sucesso === false
                    ? "text-red-400"
                    : sucesso === true
                    ? "text-green-400"
                    : "text-gray-300"
                }`}
              >
                {mensagem}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
