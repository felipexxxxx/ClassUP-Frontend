import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PerfilDropdown({ onClose }) {
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickFora = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-xl w-48"
    >
      <button
        onClick={() => {
          navigate("/perfil");
          onClose?.();
        }}
        className="block w-full text-left text-white px-4 py-2 hover:bg-gray-700 rounded-t"
      >
        Ver perfil
      </button>

      <div className="border-t border-gray-600 my-2" />

      <button
        onClick={() => {
          navigate("/historico");
          onClose?.();
        }}
        className="block w-full text-left text-white px-4 py-2 hover:bg-gray-700 rounded-b"
      >
        Histórico de Salas
      </button>
    </div>
  );
}
