import React, { useState } from "react";

export default function ModalEditarAtividade({ atividade, onClose, onSalvar }) {
  const [titulo, setTitulo] = useState(atividade.titulo);
  const [descricao, setDescricao] = useState(atividade.descricao);
  const [local, setLocal] = useState(atividade.local);
  const [data, setData] = useState(atividade.data);
  const [erro, setErro] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !descricao || !local || !data) {
      setErro("Preencha todos os campos!");
      return;
    }
    const date = new Date(data);
    const dataCorrigida = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);

    const dados = {
      titulo,
      descricao,
      local,
      data: dataCorrigida,
    };

    onSalvar(atividade.id, dados);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
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
          {erro && <p className="text-red-400 font-medium text-center">{erro}</p>}

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
            >
              Cancelar
            </button>
            <button
                type="submit"
                className="px-6 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
                >
                Salvar Alterações
                </button>

          </div>
        </form>
      </div>
    </div>
  );
}
