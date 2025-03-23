import { useNavigate } from "react-router-dom";

export default function PerfilDropdown() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white rounded shadow-md py-2 z-50 w-48">
      <button
        onClick={() => navigate("/perfil")}
        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
      >
        Ver Perfil
      </button>
      <button
        onClick={() => navigate("/historico")}
        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
      >
        Ver Histórico de Salas
      </button>
    </div>
  );
}
