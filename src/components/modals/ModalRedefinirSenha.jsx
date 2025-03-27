import { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

export default function ModalRedefinirSenha({ onClose }) {
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { redefinirSenha } = useAuth();

  const redefinir = async () => {
    if (!codigo || !novaSenha) {
      return setMensagem("Preencha todos os campos.");
    }

    setMensagem("");
    setCarregando(true);
    try {
      await redefinirSenha(codigo, novaSenha);
      setMensagem("Senha redefinida com sucesso!");
      setTimeout(onClose, 2000);
    } catch (err) {
      setMensagem("Código inválido ou erro ao redefinir senha.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 text-white p-8 rounded-2xl max-w-md w-full shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-300 mb-4">Digite o código e nova senha</h2>
        <input
          type="text"
          placeholder="Código recebido"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full px-4 py-2 mb-3 rounded bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          className="w-full px-4 py-2 mb-3 rounded bg-gray-800 text-white"
        />
        {mensagem && <p className="text-center mb-2 text-sm text-indigo-400">{mensagem}</p>}
        <button onClick={redefinir} disabled={carregando} className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded mt-2 font-semibold">
          {carregando ? "Salvando..." : "Redefinir Senha"}
        </button>
      </motion.div>
    </div>
  );
}
