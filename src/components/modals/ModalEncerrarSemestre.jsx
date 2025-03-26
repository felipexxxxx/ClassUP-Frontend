import { useState } from "react";
import { motion } from "framer-motion";

export default function ModalEncerrarSemestre({ onClose, onConfirmar }) {
  const [carregando, setCarregando] = useState(false);

  const handleConfirmar = async () => {
    setCarregando(true);
    await onConfirmar();
    setCarregando(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-gray-900 text-white p-8 rounded-2xl max-w-md w-full shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-red-400 mb-4 text-center">
          Encerrar Semestre
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Tem certeza que deseja encerrar todas as salas? Essa ação não poderá
          ser desfeita.
        </p>

        {carregando && (
          <p className="text-yellow-400 text-center mb-4 font-medium">
            Encerrando todas as salas, aguarde...
          </p>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            disabled={carregando}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            disabled={carregando}
            className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-semibold"
          >
            Confirmar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
