import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formatarDataSimples } from "../../utils/formatarData";

export default function CardHistorico({ historico }) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/historico/${historico.sala.id}`)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer bg-gray-800 px-6 py-6 rounded-2xl shadow-xl hover:shadow-indigo-500/10 transition-all flex flex-col justify-between min-h-[140px]"
    >
      <div>
        <h3 className="text-2xl font-bold text-indigo-300 mb-2 break-words">
          {historico.sala.nome}
        </h3>

        <p className="text-gray-300 mb-1">
          Perfil: <span className="text-indigo-100 font-medium">{historico.role}</span>
        </p>
      </div>

      <p className="text-sm text-gray-400 mt-4">
        Encerrada em: {formatarDataSimples(historico.dataEncerramento)}
      </p>
    </motion.div>
  );
}
