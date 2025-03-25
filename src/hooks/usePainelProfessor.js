import { useEffect, useState } from "react";
import { buscarSalasProfessor } from "../services/professorService";

export default function usePainelProfessor() {
  const [salas, setSalas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const atualizarSalas = async () => {
    try {
      const data = await buscarSalasProfessor();
      setSalas(data);
    } catch (error) {
      console.error("Erro ao buscar salas do professor:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    atualizarSalas();
  }, []);

  return { salas, carregando, atualizarSalas };
}
