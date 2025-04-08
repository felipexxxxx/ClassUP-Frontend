import { useState } from "react";
import { importarUsuarios } from "../services/adminService";

export default function useAdmin() {
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const importar = async (formData) => {
    setMensagem("");
    setSucesso(false);
    setCarregando(true);

    try {
      const response = await fetch("https://classup-python-converter-production.up.railway.app/converterJson", {
        method: "POST",
        body: formData,
      });

      const resultado = await response.json(); 

      if (!response.ok) {
        throw new Error(resultado.erro || "Erro ao converter o arquivo.");
      }

      console.log("Usuários recebidos do Flask:", resultado);

      if (!resultado.usuarios || resultado.usuarios.length === 0) {
        throw new Error("Nenhum usuário válido foi encontrado.");
      }

      await importarUsuarios(resultado.usuarios);

      setMensagem("Usuários importados com sucesso!");
      setSucesso(true);
    } catch (error) {
      console.error("Erro na importação:", error);

      if (error.response && error.response.data) {
        const msg = typeof error.response.data === "string"
          ? error.response.data
          : error.response.data.erro || "Erro ao importar usuários.";
        setMensagem(`⚠️ ${msg}`);
      } else {
        setMensagem(`❌ ${error.message || "Erro inesperado ao importar usuários."}`);
      }

      setSucesso(false);
    } finally {
      setCarregando(false);
    }
  };

  return {
    importar,
    mensagem,
    sucesso,
    carregando,
  };
}
