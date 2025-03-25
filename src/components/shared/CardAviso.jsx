import { FaTrash, FaEdit } from "react-icons/fa";
import formatarData from "../../utils/formatarData";

export default function CardAviso({ aviso, onClick, onDelete, isProfessor }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-indigo-500/10 transition-all relative">
      <h3 className="text-2xl font-bold text-white mb-2">{aviso.titulo}</h3>
      <p className="text-indigo-200 mb-2">{aviso.mensagem}</p>
      <p className="text-indigo-400 text-sm">📨 {formatarData(aviso.enviadaEm)}</p>

      {isProfessor && (
        <div className="absolute top-4 right-4 flex gap-3">
          <button
            onClick={onClick}
            title="Editar"
            className="text-yellow-400 hover:text-yellow-200 text-lg"
          >
            <FaEdit />
          </button>
          <button
            onClick={onDelete}
            title="Excluir"
            className="text-red-500 hover:text-red-300 text-lg"
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
}
