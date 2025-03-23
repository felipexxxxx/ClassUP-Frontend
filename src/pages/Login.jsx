import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import jwtDecode from "jwt-decode";

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const body = login.includes("@")
        ? { email: login, senha }
        : { matricula: login, senha };

      const response = await api.post("/user/login", body);
      const token = response.data.accessToken;

      if (!token || typeof token !== "string") {
        alert("Token inválido");
        return;
      }

      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const role = decoded.role;

      if (role === "ALUNO") {
        navigate("/aluno");
      } else if (role === "PROFESSOR") {
        navigate("/professor");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Login inválido!");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo com texto */}
      <div className="w-1/2 bg-[#18163c] flex flex-col justify-center items-center text-white">
        <h1 className="text-9xl font-extrabold mb-4 text-indigo-800">ClassUP</h1>
        <p className="text-4xl font-medium text-gray-800">Sistema Educacional</p>
      </div>

      {/* Lado direito com formulário */}
      <div className="w-1/2 bg-gray-900 flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 text-white p-12 rounded-xl shadow-xl w-[500px]"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-400">
            Login
          </h2>

          <label className="block mb-2 text-lg font-semibold text-gray-300">
            Email ou Matrícula
          </label>
          <input
            type="text"
            placeholder="Digite seu login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full p-3 mb-6 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <label className="block mb-2 text-lg font-semibold text-gray-300">
            Senha
          </label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-3 mb-8 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold transition duration-200"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
