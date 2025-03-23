import formatarData from "../../utils/formatarData";

export default function CardAtividade({ atividade, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-indigo-500/20 transition-all cursor-pointer"
    >
      <h3 className="text-3xl font-bold text-indigo-300 mb-2">
        {atividade.titulo}
        <span className="text-base text-gray-400 ml-2">
          ({formatarData(atividade.data)})
        </span>
      </h3>

      <p className="text-lg text-gray-300 mb-2">
        {atividade.descricao || "Sem descrição."}
      </p>

      <p>
        <span className="font-semibold text-gray-400">Status:</span>{" "}
        <span className="text-indigo-200 font-semibold">
          {atividade.status || "Desconhecido"}
        </span>
      </p>
    </div>
  );
}
