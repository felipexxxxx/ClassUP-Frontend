import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import PerfilDropdown from "./PerfilDropdown";
import ModalLogout from "../shared/ModalLogout";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

export default function Header({ nomeSala = "", codigoAcesso = "", exibirSala = true }) {
  const navigate = useNavigate();
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [mostrarModalLogout, setMostrarModalLogout] = useState(false);
  const { redirecionarPorRole, logout } = useAuth();

  const isLogado = !!localStorage.getItem("token");

  const handleClickLogo = async () => {
    if (!isLogado) {
      navigate("/TelaInicial");
      return;
    }

    try {
      await redirecionarPorRole();
    } catch (error) {
      console.error("Erro ao redirecionar:", error);
    }
  };

  return (
    <header className="flex items-center justify-between px-10 py-6 border-b border-gray-800 bg-gray-950 shadow-md relative">
      <h1
        className="text-5xl font-extrabold text-indigo-300 tracking-wide cursor-pointer hover:text-indigo-100 transition duration-200"
        onClick={handleClickLogo}
      >
        ClassUP
      </h1>

      {exibirSala && (
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center text-white">
          <div className="text-3xl font-semibold">{nomeSala}</div>
          {codigoAcesso && (
            <div className="text-md text-indigo-300 font-mono mt-1">
              <span className="font-bold">{codigoAcesso}</span>
            </div>
          )}
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
                <PerfilDropdown onClose={() => setMostrarDropdown(false)} />
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

      <AnimatePresence>
        {mostrarModalLogout && (
          <ModalLogout
            onCancel={() => setMostrarModalLogout(false)}
            onConfirm={logout}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
