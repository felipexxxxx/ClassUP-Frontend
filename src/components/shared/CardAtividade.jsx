import formatarData from "../../utils/formatarData";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CardAtividade({
  atividade,
  onClick,
  isProfessor,
  onDelete,
  modoSomenteLeitura = false // novo
}) {
  const dataFormatada = atividade.data
    ? formatarData(atividade.data)
    : "Data não informada";

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-indigo-500/20 transition-all cursor-pointer relative"
    >
      <h3 className="text-3xl font-bold text-indigo-300 mb-2">
        {atividade.titulo}
        <span className="text-xl text-gray-400 ml-2">({dataFormatada})</span>
      </h3>

      <p className="text-xl text-gray-300 mb-2">
        {atividade.descricao || "Sem descrição."}
      </p>

      {/* Mostrar LOCAL sempre */}
      <p className="text-lg text-indigo-300 mb-3">
        📍 <span className="font-medium text-white">Local:</span>{" "}
        {atividade.local || "Não informado"}
      </p>

      {/* Mostrar STATUS apenas se não for leitura e não for professor */}
      {!isProfessor && !modoSomenteLeitura && (
        <p>
          <span className="text-lg text-white font-semibold text-gray-400">
            Status presença:
          </span>{" "}
          <span
            className={`font-semibold ${
              atividade.status === "CONFIRMADO"
                ? "text-green-400"
                : atividade.status === "CANCELADO"
                ? "text-red-400"
                : "text-indigo-200"
            }`}
          >
            {atividade.status || "PENDENTE"}
          </span>
        </p>
      )}

      {/* Ícones de edição apenas para professor em modo normal */}
      {isProfessor && !modoSomenteLeitura && (
        <div className="absolute top-4 right-4 flex gap-3 z-10">
          <button
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
