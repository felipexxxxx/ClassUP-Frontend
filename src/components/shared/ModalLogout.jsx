import { motion } from "framer-motion";

export default function ModalLogout({ onConfirm, onCancel }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-gray-800 p-6 rounded-xl w-full max-w-sm text-white shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-300 text-center">
          Deseja sair?
        </h2>
        <p className="text-lg text-center text-gray-300 mb-6">
          Você será desconectado do sistema.
        </p>
        <div className="flex justify-center gap-4">
            <button
                onClick={onCancel}
                className="w-28 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
            >
                Cancelar
            </button>
            <button
                onClick={onConfirm}
                className="w-28 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
            >
                Sair
            </button>
            </div>
      </motion.div>
    </motion.div>
  );
}
