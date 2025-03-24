import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CardHistorico({ historico }) {
  const navigate = useNavigate();

  const dataFormatada = new Date(historico.dataEncerramento).toLocaleDateString("pt-BR");
  const horaFormatada = new Date(historico.dataEncerramento).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      onClick={() => navigate(`/historico/${historico.id}`)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer bg-gray-800 px-6 py-6 rounded-2xl shadow-xl hover:shadow-indigo-500/10 transition-all"
    >
      <h3 className="text-2xl font-bold text-indigo-300 mb-2">
        {historico.sala.nome}
      </h3>

      <p className="text-gray-300 mb-1">
        Cargo: <span className="text-indigo-100 font-medium">{historico.role}</span>
      </p>

      <p className="text-sm text-gray-400">
        Encerrada em: {dataFormatada}, {horaFormatada}
      </p>
    </motion.div>
  );
}
