import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ModalEncerrarSemestre({ onClose, onConfirmar }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2 justify-center">
          <FaExclamationTriangle className="text-red-500" />
          Encerrar semestre
        </h3>
        <p className="text-lg text-gray-300 mb-6 text-center">
          Tem certeza que deseja encerrar o semestre? <br />
          <strong>Todas as suas salas ativas serão encerradas</strong> e movidas para o histórico.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 rounded bg-red-800 hover:bg-red-700 text-white font-semibold"
          >
            Sim, encerrar
          </button>
        </div>
      </div>
    </div>
  );
}
