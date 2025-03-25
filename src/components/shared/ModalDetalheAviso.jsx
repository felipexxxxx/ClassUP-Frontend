import { motion } from "framer-motion";
import formatarData from "../../utils/formatarData";

export default function ModalDetalheAviso({ aviso, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-gray-900 text-white max-w-xl w-full p-8 rounded-2xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-indigo-300 mb-4">{aviso.titulo}</h2>
        <p className="text-xl text-indigo-400 mb-2">
          📨 {formatarData(aviso.enviadaEm)}
        </p>
        <p className="text-xl text-white">{aviso.mensagem || "Sem conteúdo."}</p>
      </motion.div>
    </div>
  );
}
