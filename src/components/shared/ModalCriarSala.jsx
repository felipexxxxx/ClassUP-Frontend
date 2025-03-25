import React, { useState } from "react";

export default function ModalCriarSala({ onConfirm, onCancel }) {
  const [nome, setNome] = useState("");

  const handleSubmit = () => {
    if (nome.trim()) {
      onConfirm(nome.trim());
      setNome("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Criar Nova Sala</h2>
        <input
          type="text"
          placeholder="Nome da sala"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-gray-700 text-white"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
