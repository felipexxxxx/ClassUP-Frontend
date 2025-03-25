import { useEffect, useState } from "react";
import { buscarSalasProfessor } from "../services/professorService";

export default function usePainelProfessor() {
  const [salas, setSalas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await buscarSalasProfessor();
        setSalas(data);
      } catch (error) {
        console.error("Erro ao buscar salas do professor:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  return { salas, carregando };
}
