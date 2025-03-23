import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { motion } from "framer-motion";

export default function TelaAcessoSala() {
  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  const handleEntrar = async () => {
    setMensagem(""); // Limpa mensagem temporariamente

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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      {/* MENSAGEM FORA DO FORMULÁRIO */}
      <motion.p
        className="text-center mb-20 text-3xl font-medium text-gray-300 -mt-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
          Ops! Parece que você ainda não está em nenhuma sala <span className="text-yellow-400">😕</span>
      </motion.p>
  
      {/* FORMULÁRIO CENTRAL */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 text-white p-10 rounded-xl shadow-xl w-full max-w-md"
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
  
        {/* FEEDBACK abaixo do botão */}
        {mensagem && (
          <p
            className={`mt-4 text-sm text-center ${
              sucesso === false
                ? "text-red-400"
                : sucesso === true
                ? "text-green-400"
                : "text-gray-300"
            }`}
          >
            {mensagem}
          </p>
        )}
      </motion.div>
    </div>
  );
}
