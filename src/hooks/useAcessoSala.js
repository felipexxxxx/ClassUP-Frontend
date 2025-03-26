import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { entrarNaSala } from "../services/alunoService";

export default function useAcessoSala() {
  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  const handleEntrar = async () => {
    setMensagem("");

    try {
      const token = localStorage.getItem("token");
      await entrarNaSala(codigo, token);

      setMensagem("Você entrou na sala com sucesso!");
      setSucesso(true);

      setTimeout(() => {
        navigate("/aluno/sala");
      }, 1500);
    } catch (error) {
      console.error(error);
      setMensagem("Código inválido. Verifique com o professor.");
      setSucesso(false);
    }
  };

  return {
    codigo,
    setCodigo,
    mensagem,
    sucesso,
    handleEntrar,
  };
}
