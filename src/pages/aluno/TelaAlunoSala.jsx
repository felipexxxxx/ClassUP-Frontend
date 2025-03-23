import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Aluno() {
  const [sala, setSala] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/sala/aluno", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSala(res.data))
      .catch((err) => {
        console.error("Erro ao buscar sala:", err);
        alert("Não foi possível carregar a sala.");
      });
  }, []);

  if (!sala) return <div className="text-white p-10">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-indigo-600 p-4 shadow">
        <h1 className="text-2xl font-bold">ClassUP</h1>
      </header>

      <main className="flex items-center justify-center p-10">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl">
          <h2 className="text-3xl font-bold text-indigo-400 mb-2">
            {sala.nome}
          </h2>
          <p className="text-gray-300 mb-4">{sala.descricao}</p>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition">
            Ver atividades
          </button>
        </div>
      </main>
    </div>
  );
}
