import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import PerfilDropdown from "./PerfilDropdown";
import api from "../api/api";
import { useState } from "react";

export default function Header({ nomeSala = "", exibirSala = true }) {
  const navigate = useNavigate();
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  const isLogado = !!localStorage.getItem("token");

  const logout = () => {
    if (confirm("Você realmente deseja sair?")) {
      localStorage.clear();
      navigate("/TelaInicial");
    }
  };

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
              className="text-3xl text-indigo-300 hover:text-white transition mr-7"
            >
              {localStorage.getItem("fotoPerfil") ? (
                <img
                  src={localStorage.getItem("fotoPerfil")}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400"
                />
              ) : (
                <FaUserCircle />
              )}
            </button>

            {mostrarDropdown && (
              <div className="absolute top-14 right-0">
                <PerfilDropdown />
              </div>
            )}

            <button
              onClick={logout}
              className="text-lg text-red-400 hover:text-red-600 transition"
            >
              Sair
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
    </header>
  );
}
