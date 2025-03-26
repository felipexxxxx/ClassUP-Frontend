import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { criarAtividadeApi } from "../../services/professorService";


export default function ModalCriarAtividade({ onClose, onSucesso }) {
  const { id: salaId } = useParams();
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    local: "",
    dataHora: "",
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.titulo || !form.descricao || !form.local || !form.dataHora) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }
  
    setErro(null);
    setCarregando(true);
    try {
      await criarAtividadeApi({ ...form, sala: { id: salaId } });
      onSucesso("Atividade criada com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao criar atividade:", error);
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
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
          <input
            name="local"
            type="text"
            placeholder="Local"
            value={form.local}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
          <input
            name="dataHora"
            type="datetime-local"
            value={form.dataHora}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
          {erro && <p className="text-red-400 font-medium">{erro}</p>}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={carregando}
            className={`px-6 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition `}
          >
            Criar Atividade
          </button>
        </div>
      </motion.div>
    </div>
  );
}
