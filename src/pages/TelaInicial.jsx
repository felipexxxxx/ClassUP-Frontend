import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TelaInicial() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-900 text-white">
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <h1 className="text-4xl font-bold text-indigo-300">ClassUP</h1>
        <nav>
          <button
            onClick={() => navigate("/sobre")}
            className="text-2xl text-gray-300 hover:text-white transition-colors duration-200"
          >
            Quem Somos
          </button>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-indigo-300 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Seja bem-vindo!
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl max-w-4xl text-gray-300 mb-10 text-justify"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          O <strong>ClassUP</strong> é uma plataforma educacional desenvolvida para apoiar <strong>atividades especiais</strong>, promovendo diferentes estilos de ensino e simplificando a jornada educacional de forma moderna e acessível.
        </motion.p>

        <motion.button
          onClick={() => navigate("/login")}
          className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white font-semibold py-3 px-8 rounded-full shadow-md text-2xl"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Acessar
        </motion.button>
      </main>

      <footer className="text-center py-4 text-lg text-gray-400 border-t border-gray-700">
        © {new Date().getFullYear()} ClassUP. Todos os direitos reservados.
      </footer>
    </div>
  );
}