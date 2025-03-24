
import { motion } from "framer-motion";
import formatarData from "../../utils/formatarData";

export default function ModalDetalheAviso({ aviso, onClose }) {
  if (!aviso) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 p-8 rounded-2xl max-w-xl w-full shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-indigo-300 mb-2">{aviso.titulo}</h2>

        <p className="text-md text-gray-400 mb-4">
            Enviado em: {formatarData(aviso.enviadaEm)}
        </p>

        <p className="text-lg text-gray-300 whitespace-pre-line">
          {aviso.mensagem}
        </p>
      </motion.div>
    </motion.div>
  );
}
