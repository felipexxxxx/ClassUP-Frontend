import formatarData from "../../utils/formatarData";
import { motion } from "framer-motion";

export default function ModalDetalheAtividade({
  atividade,
  onClose,
  onConfirmar,
  onCancelar,
  isProfessor = false,
  modoSomenteLeitura = false,
  resumo = null
}) {
  console.log("Atividade recebida:", atividade);

  const dataFormatada = atividade.data
    ? formatarData(atividade.data)
    : "Data não informada";

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const desabilitarBotoes =
    atividade.status !== "PENDENTE" || modoSomenteLeitura;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-gray-900 text-white max-w-2xl w-full p-8 rounded-2xl shadow-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-indigo-300 mb-2">
          {atividade.titulo}
        </h2>

        <p className="text-xl text-indigo-400 text-sm mb-3">📅 {dataFormatada}</p>

        <p className="text-xl text-white mb-3">
          {atividade.descricao || "Sem descrição fornecida."}
        </p>

        <p className="text-lg text-indigo-300 mb-6">
          📍 <span className="font-medium text-white">Local:</span> {atividade.local || "Não informado"}
        </p>

        {isProfessor && resumo && (
          <div className="mb-6 text-lg text-green-300">
            ✅ <span className="font-medium text-white">Presenças confirmadas:</span> {resumo.confirmados}
          </div>
        )}
        {/* Esconde status e botões se modoSomenteLeitura for true OU se for professor */}
        {!isProfessor && !modoSomenteLeitura && (
          <>
            <div className="mb-6">
              <span className="text-white font-semibold mr-2">Status presença:</span>
              <span
                className={`font-semibold ${
                  atividade.status === "CONFIRMADO"
                    ? "text-green-400"
                    : atividade.status === "CANCELADO"
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >
                {atividade.status || "PENDENTE"}
              </span>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={onConfirmar}
                disabled={desabilitarBotoes}
                className={`px-5 py-2 rounded text-white font-medium transition-all ${
                  desabilitarBotoes
                    ? "bg-green-900 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-500"
                }`}
              >
                Confirmar Presença
              </button>
              <button
                onClick={onCancelar}
                disabled={desabilitarBotoes}
                className={`px-5 py-2 rounded text-white font-medium transition-all ${
                  desabilitarBotoes
                    ? "bg-red-900 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-500"
                }`}
              >
                Cancelar Presença
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}