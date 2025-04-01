import { useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import ModalEnviarEmail from "../components/modals/ModalEnviarEmail";
import ModalRedefinirSenha from "../components/modals/ModalRedefinirSenha";
import { useNavigate } from "react-router-dom";  // Importando useNavigate para redirecionar

export default function TelaLogin() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarModalEmail, setMostrarModalEmail] = useState(false);
  const [mostrarModalCodigo, setMostrarModalCodigo] = useState(false);
  const [emailParaRedefinir, setEmailParaRedefinir] = useState("");

  const { mensagem, sucesso, carregandoRedirect, realizarLogin } = useAuth();
  const navigate = useNavigate();  // Definindo o hook para navegação

  const handleLogin = (e) => {
    e.preventDefault();
    realizarLogin(login, senha);
  };

  if (carregandoRedirect) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl text-gray-400">Entrando no sistema...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* esquerda */}
      <motion.div
        className="w-1/2 text-white flex items-center justify-center flex-col"
        style={{
          backgroundImage: `url('/src/assets/background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold text-indigo-300" >ClassUP</h1>
        <p className="text-3xl mt-4 text-gray-300"><strong>Facilitando o aprendizado😊</strong></p>
      </motion.div>

      {/* direita */}
      <motion.div
        className="w-1/2 bg-gray-900 flex items-center justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-md"
        >
          <motion.h2
            className="text-3xl font-bold mb-6 text-center text-indigo-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Login
          </motion.h2>

          <label className="block mb-2 text-sm font-semibold text-gray-300">
            Email ou Matrícula
          </label>
          <input
            type="text"
            placeholder="Digite seu login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
          />

          <label className="block mb-2 text-sm font-semibold text-gray-300">
            Senha
          </label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
          />

          <motion.button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded font-semibold"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
          >
            Entrar
          </motion.button>

          <p
            onClick={() => setMostrarModalEmail(true)}
            className="mt-4 text-sm text-indigo-400 text-center cursor-pointer hover:underline"
          >
            Esqueceu a senha?
          </p>

          {mensagem && (
            <motion.p
              className={`mt-4 text-sm text-center ${
                sucesso ? "text-green-400" : "text-red-400"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {mensagem}
            </motion.p>
          )}
        </form>
      </motion.div>

      {mostrarModalEmail && (
        <ModalEnviarEmail
          onClose={() => setMostrarModalEmail(false)}
          onEmailEnviado={(email) => {
            setEmailParaRedefinir(email);
            setMostrarModalEmail(false);
            setMostrarModalCodigo(true);
          }}
        />
      )}

      {mostrarModalCodigo && (
        <ModalRedefinirSenha
          email={emailParaRedefinir}
          onClose={() => setMostrarModalCodigo(false)}
        />
      )}
    </div>
  );
}
