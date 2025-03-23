import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, buscarSalaAluno } from "../services/authService";
import jwtDecode from "jwt-decode";

export default function useAuth() {
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregandoRedirect, setCarregandoRedirect] = useState(false);
  const navigate = useNavigate();

  const realizarLogin = async (login, senha) => {
    try {
      const body = login.includes("@")
        ? { email: login, senha }
        : { matricula: login, senha };

      const token = await loginUser(body);

      if (!token || typeof token !== "string") {
        setMensagem("Token inválido");
        setSucesso(false);
        return;
      }

      localStorage.setItem("token", token);
      const { role } = jwtDecode(token);

      setMensagem("Login realizado com sucesso!");
      setSucesso(true);

      setTimeout(() => setCarregandoRedirect(true), 850);

      setTimeout(async () => {
        if (role === "ALUNO") {
          try {
            const salaResponse = await buscarSalaAluno(token);
            if (salaResponse.data) {
              navigate("/aluno/sala");
            } else {
              navigate("/aluno/entrar");
            }
          } catch {
            navigate("/aluno/entrar");
          }
        } else if (role === "PROFESSOR") {
          navigate("/professor");
        }
      }, 2000);
    } catch (err) {
      setMensagem("Login inválido. Verifique seus dados.");
      setSucesso(false);
    }
  };

  return {
    mensagem,
    sucesso,
    carregandoRedirect,
    realizarLogin,
  };
}
