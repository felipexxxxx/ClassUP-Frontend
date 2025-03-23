import { useEffect, useState } from "react";
import api from "../api/api";

export default function usePerfil() {
  const [perfil, setPerfil] = useState({});
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const res = await api.get("/user", { headers });
        setPerfil(res.data);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      }
    };

    carregarPerfil();
  }, []);

  return perfil;
}