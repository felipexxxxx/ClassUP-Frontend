import { useState } from "react";
import { motion } from "framer-motion";

export default function ModalEditarAviso({ aviso, onClose, onSalvar }) {
  const [titulo, setTitulo] = useState(aviso.titulo);
  const [mensagem, setMensagem] = useState(aviso.mensagem);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !mensagem) {
      setErro("Preencha todos os campos!");
      return;
    }

    onSalvar(aviso.id, { titulo, mensagem });
    onClose();
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
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 text-white p-8 rounded-2xl max-w-xl w-full shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-indigo-300 mb-6">Editar Aviso</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            required
          />
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Mensagem"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            required
          />

          <div className="flex justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={carregando}
              className={`px-6 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition`}
            >
              Salvar Alterações
            </button>
          </div>
          {erro && <p className="text-red-400 font-medium text-center">{erro}</p>}
        </form>
      </motion.div>
    </div>
  );
}
