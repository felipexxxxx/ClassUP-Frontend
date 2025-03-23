import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import PerfilDropdown from "./PerfilDropdown";
import api from "../../api/api";
import { useState } from "react";

export default function Header({ nomeSala = "", exibirSala = true }) {
  const navigate = useNavigate();
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [mostrarModalLogout, setMostrarModalLogout] = useState(false);

  const isLogado = !!localStorage.getItem("token");

  const handleClickLogo = async () => {
    if (!isLogado) {
      navigate("/");
      return;
    }

    try {
      const response = await api.get("/sala/aluno");
      if (response.data) {
        navigate("/aluno/sala");
      }
    } catch (error) {
      navigate("/aluno/entrar");
    }
  };

  const logout = () => {
    localStorage.clear();
    setMostrarModalLogout(false);
    navigate("/TelaInicial");
  };

  return (
    <header className="flex items-center justify-between px-10 py-6 border-b border-gray-800 bg-gray-950 shadow-md">
      <h1
        className="text-5xl font-extrabold text-indigo-300 tracking-wide cursor-pointer"
        onClick={handleClickLogo}
      >
        ClassUP
      </h1>

      {exibirSala && (
        <div className="text-2xl font-semibold text-white flex-1 text-center -ml-20">
          {nomeSala}
        </div>
      )}

      <div className="flex items-center gap-6 relative">
        {isLogado ? (
          <>
            <button
              onClick={() => setMostrarDropdown(!mostrarDropdown)}
              className="group text-3xl text-indigo-300 hover:text-white active:scale-90 transition duration-200 mr-8"
            >
              {localStorage.getItem("fotoPerfil") ? (
                <img
                  src={localStorage.getItem("fotoPerfil")}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400 group-hover:border-white group-active:scale-95 transition duration-200"
                />
              ) : (
                <FaUserCircle className="group-hover:text-white group-active:scale-90 transition duration-200" />
              )}
            </button>

            {mostrarDropdown && (
              <div className="absolute top-14 right-0">
                <PerfilDropdown />
              </div>
            )}

            <button
              onClick={() => setMostrarModalLogout(true)}
              title="Sair"
              className="group text-2xl transition duration-200"
            >
              <FiLogOut className="text-red-400 group-hover:text-red-200 group-active:scale-90 transition duration-200" />
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/sobre")}
            className="text-xl text-indigo-300 hover:text-white transition"
          >
            <strong>Quem somos</strong>
          </button>
        )}
      </div>

      {/* Modal de logout */}
      <AnimatePresence>
        {mostrarModalLogout && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMostrarModalLogout(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-800 p-6 rounded-xl w-full max-w-sm text-white shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-4 text-indigo-300 text-center">
                Deseja sair?
              </h2>
              <p className="text-center text-gray-300 mb-6">
                Você será desconectado do sistema.
              </p>
              <div className="flex justify-center gap-4 ">
                <button
                  onClick={() => setMostrarModalLogout(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white"
                >
                  Cancelar
                </button>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
                >
                  Sair
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
