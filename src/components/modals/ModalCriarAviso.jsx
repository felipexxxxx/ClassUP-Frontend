import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { criarAvisoApi } from "../../services/professorService";

export default function ModalCriarAviso({ onClose, onSucesso }) {
  const { id: salaId } = useParams();
  const [form, setForm] = useState({
    titulo: "",
    mensagem: "",
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.titulo || !form.mensagem) {
      setErro("Preencha todos os campos!");
      return;
    }

    setErro(null);
    setCarregando(true);
    try {
      await criarAvisoApi({ ...form, sala: { id: salaId } });
      onSucesso("Aviso criado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao criar aviso:", error);
    } finally {
      setCarregando(false);
    }
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
        className="bg-gray-900 text-white p-8 rounded-2xl max-w-xl w-full shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-indigo-300 mb-6">Criar Novo Aviso</h2>

        <div className="space-y-4">
          <input
            name="titulo"
            type="text"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
          <textarea
            name="mensagem"
            placeholder="Mensagem"
            value={form.mensagem}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />

          {erro && <p className="text-red-400 font-medium text-center">{erro}</p>}
          {carregando && (
            <p className="text-indigo-400 font-medium text-center">⏳ Enviando, aguarde...</p>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={carregando}
            className="px-6 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
          >
            {carregando ? "Criando..." : "Criar Aviso"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
