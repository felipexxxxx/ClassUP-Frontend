import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, buscarSalaAluno, logoutUsuario } from "../services/authService";
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

      setTimeout(() => redirecionarPorRole(), 2000);
    } catch (err) {
      setMensagem(
        err.message?.includes("Network Error")
          ? "Erro de conexão. Verifique o servidor."
          : "Login inválido. Verifique seus dados."
      );
      setSucesso(false);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await logoutUsuario(token);
      } catch (err) {
        console.warn("Erro ao deslogar no backend:", err);
      }
    }
    localStorage.clear();
    navigate("/TelaInicial");
  };

  const redirecionarPorRole = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const { role } = jwtDecode(token);

    if (role === "ALUNO") {
      try {
        const response = await buscarSalaAluno(token);

        if (response?.data) {
          navigate("/aluno/sala");
        } else {
          navigate("/aluno/entrar");
        }
      } catch (err) {
        if (err.response?.status === 400) {
          navigate("/aluno/entrar");
        } else {
          console.error("Erro inesperado ao buscar sala do aluno:", err);
          navigate("/login");
        }
      }
    } else if (role === "PROFESSOR") {
      navigate("/professor/painel");
    } else {
      navigate("/login"); 
    }
  } catch (error) {
    console.error("Erro ao decodificar token ou redirecionar:", error);
    navigate("/login");
  }
};

  return {
    mensagem,
    sucesso,
    carregandoRedirect,
    realizarLogin,
    logout,
    redirecionarPorRole,
  };
}
