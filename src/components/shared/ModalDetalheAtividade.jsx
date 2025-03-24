import { motion } from "framer-motion";
import formatarData from "../../utils/formatarData";

export default function ModalDetalheAtividade({
  atividade,
  onClose,
  onConfirmar,
  onCancelar,
}) {
  if (!atividade) return null;

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
        <h2 className="text-3xl font-bold text-indigo-300 mb-2">
          {atividade.titulo}
        </h2>

        <p className="text-md text-gray-400 mb-2">
          {formatarData(atividade.data)}
        </p>

        <p className="text-gray-300 mb-2">{atividade.descricao}</p>

        <p className="text-gray-300 mb-6">
          Local:{" "}
          <span className="text-indigo-200">
            {atividade.local || "Não informado"}
          </span>
        </p>

        <p className="mb-6">
          <span className="font-semibold text-gray-400">Status:</span>{" "}
          <span className="text-indigo-200 font-semibold">
            {atividade.status}
          </span>
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onConfirmar(atividade.id)}
            disabled={atividade.status !== "PENDENTE"}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 rounded-full text-white text-sm font-semibold"
          >
            Confirmar Presença
          </button>
          <button
            onClick={() => onCancelar(atividade.id)}
            disabled={atividade.status !== "PENDENTE"}
            className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 rounded-full text-white text-sm font-semibold"
          >
            Cancelar Presença
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
