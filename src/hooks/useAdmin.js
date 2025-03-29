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
      const response = await fetch("classup-python-converter-production.up.railway.app/converter", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.erro || "Erro ao converter o arquivo.");
      }


      const jsonConvertido = await fetch("http://localhost:5000/usuarios_convertidos.json");
      const usuarios = await jsonConvertido.json();

      await importarUsuarios(usuarios);

      setMensagem("✅ Usuários importados com sucesso!");
      setSucesso(true);
    } catch (error) {
      console.error("Erro na importação:", error);

      if (error.response && error.response.data) {
        // resposta do backend Java (axios interceptado)
        const msg = typeof error.response.data === "string"
          ? error.response.data
          : error.response.data.erro || "Erro ao importar usuários.";

        setMensagem(`⚠️ ${msg}`);
      } else {
        //  erro padrão ou do Python
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
