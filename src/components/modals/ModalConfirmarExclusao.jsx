import React from "react";
import { motion } from "framer-motion";

export default function ModalConfirmarExclusao({
  titulo,
  mensagem,
  onClose,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-900 text-white p-8 rounded-xl max-w-md w-full shadow-xl"
      >
        <h2 className="text-2xl font-bold text-red-400 mb-4">{titulo}</h2>
        <p className="mb-6 text-gray-300">{mensagem}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition"
          >
            Confirmar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
