import React from "react";

export default function ModalCriarSala({
  nomeNovaSala,
  setNomeNovaSala,
  onClose,
  onConfirmar
}) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h3 className="text-2xl font-bold text-indigo-300 mb-4 text-center">Criar nova sala</h3>
        <input
          value={nomeNovaSala}
          onChange={(e) => setNomeNovaSala(e.target.value)}
          className="w-full px-4 py-2 mb-6 rounded bg-gray-900 text-white border border-indigo-500"
          placeholder="Digite o nome da sala"
        />
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
