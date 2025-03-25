// components/modals/ModalConfirmarExclusao.jsx
import React from "react";

export default function ModalConfirmarExclusao({ titulo, mensagem, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-red-400 mb-4">{titulo}</h2>
        <p className="text-gray-300 mb-6">{mensagem}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
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
      </div>
    </div>
  );
}
