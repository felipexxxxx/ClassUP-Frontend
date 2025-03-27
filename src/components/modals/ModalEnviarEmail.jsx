import { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

export default function ModalEnviarEmail({ onClose, onEmailEnviado }) {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { enviarCodigoEmail } = useAuth();

  const enviarEmail = async () => {
    if (!email) return setMensagem("Digite um e-mail válido.");

    setMensagem("");
    setCarregando(true);
    try {
      await enviarCodigoEmail(email);
      setMensagem("Código enviado com sucesso!");
      setTimeout(() => onEmailEnviado(email), 1500);
    } catch (err) {
      setMensagem("Erro ao enviar e-mail. Verifique o endereço.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 text-white p-8 rounded-2xl max-w-md w-full shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-300 mb-4">Redefinir Senha</h2>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white"
        />
        {mensagem && <p className="text-center mb-2 text-sm text-indigo-400">{mensagem}</p>}
        <button onClick={enviarEmail} disabled={carregando} className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded mt-2 font-semibold">
          {carregando ? "Enviando..." : "Enviar código"}
        </button>
      </motion.div>
    </div>
  );
}
