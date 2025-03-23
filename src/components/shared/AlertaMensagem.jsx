import { motion, AnimatePresence } from "framer-motion";

export default function AlertaMensagem({ mensagem, tipo = "sucesso" }) {
  if (!mensagem) return null;

  const cor = tipo === "erro" ? "bg-red-600" : "bg-green-700";

  return (
    <AnimatePresence>
      <motion.div
        key="alerta"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`${cor} text-white text-center py-2 px-4 rounded shadow mb-6`}
      >
        {mensagem}
      </motion.div>
    </AnimatePresence>
  );
}