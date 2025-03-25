import React, { useState } from "react";

export default function ModalEditarAtividade({ atividade, onClose, onSalvar }) {
  const [titulo, setTitulo] = useState(atividade.titulo);
  const [descricao, setDescricao] = useState(atividade.descricao);
  const [local, setLocal] = useState(atividade.local);
  const [data, setData] = useState(atividade.data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date(data);
    const dataCorrigida = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16); // corta os segundos

    const dados = {
      titulo,
      descricao,
      local,
      data: dataCorrigida,
    };
    onSalvar(atividade.id, dados);
    onClose();
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl text-indigo-300 font-bold mb-4">Editar Atividade</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="bg-gray-800 p-3 rounded text-white"
            required
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="bg-gray-800 p-3 rounded text-white"
            required
          />
          <input
            type="text"
            placeholder="Local"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            className="bg-gray-800 p-3 rounded text-white"
            required
          />
          <input
            type="datetime-local"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="bg-gray-800 p-3 rounded text-white"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-300 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
