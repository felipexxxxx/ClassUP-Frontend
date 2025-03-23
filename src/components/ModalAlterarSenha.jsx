import { motion } from "framer-motion";

export default function ModalRedefinirSenha({ onClose, onSubmit, erroSenha }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
        className="bg-gray-800 p-6 rounded-xl w-full max-w-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-indigo-300">Redefinir Senha</h3>
        <input
          name="senhaAtual"
          type="password"
          required
          placeholder="Senha atual"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
        />
        <input
          name="novaSenha"
          type="password"
          required
          minLength={8}
          placeholder="Nova senha (mínimo 8 caracteres)"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
        />
        {erroSenha && (
          <p className="text-red-400 text-sm mb-3">{erroSenha}</p>
        )}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white font-semibold w-full"
        >
          Atualizar Senha
        </button>
      </motion.form>
    </motion.div>
  );
}