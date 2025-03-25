import { FaTrash, FaEdit } from "react-icons/fa";
import formatarData from "../../utils/formatarData";

export default function CardAviso({ aviso, onClick, isProfessor = false, onDelete }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 px-8 py-11 rounded-2xl shadow-xl hover:shadow-indigo-500/20 transition-all cursor-pointer relative"
    >
      {isProfessor && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 flex gap-3"
        >
          <FaEdit
            className="text-yellow-400 hover:text-yellow-300 cursor-pointer"
            title="Editar aviso"
            onClick={() => onClick?.(aviso)}
          />
          <FaTrash
            className="text-red-500 hover:text-red-300 cursor-pointer"
            title="Excluir aviso"
            onClick={() => onDelete?.(aviso.id)}
          />
        </div>
      )}

      <h3 className="text-3xl font-bold text-indigo-300 mb-2">
        {aviso.titulo}
        <span className="text-xl text-gray-400 ml-2">
          ({formatarData(aviso.enviadaEm)})
        </span>
      </h3>

      <p className="text-xl text-gray-300 mb-2">
        {aviso.mensagem || "Sem conteúdo."}
      </p>
    </div>
  );
}
