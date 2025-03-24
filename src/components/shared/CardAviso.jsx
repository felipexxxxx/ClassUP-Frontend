import formatarData from "../../utils/formatarData";

export default function CardAviso({ aviso, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 px-8 py-11 rounded-2xl shadow-xl hover:shadow-indigo-500/20 transition-all cursor-pointer"
    >
      <h3 className="text-3xl font-bold text-indigo-300 mb-2">
        {aviso.titulo}
        <span className="text-xl text-base text-gray-400 ml-2">
          ({formatarData(aviso.enviadaEm)})
        </span>
      </h3>

      <p className="text-lg text-gray-300 mb-2">
        {aviso.mensagem || "Sem conteúdo."}
      </p>
    </div>
  );
}
