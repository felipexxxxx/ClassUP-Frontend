import { motion } from "framer-motion";

export default function AnimacaoEntrada({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, delay }}
    >
      {children}
    </motion.div>
  );
}
