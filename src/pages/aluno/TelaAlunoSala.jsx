import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { motion } from "framer-motion";

export default function TelaAlunoSala() {
  const [abaAtiva, setAbaAtiva] = useState("atividades");
  const [atividades, setAtividades] = useState([]);
  const [perfil, setPerfil] = useState({});
  const [colegas, setColegas] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    carregarAtividades();
    carregarPerfil();
    carregarColegas();
  }, []);

  const carregarAtividades = async () => {
    const res = await api.get("/sala/atividades", { headers });
    setAtividades(res.data);
  };

  const carregarPerfil = async () => {
    const res = await api.get("/user/perfil", { headers });
    setPerfil(res.data);
  };

  const carregarColegas = async () => {
    const res = await api.get("/sala/detalhes", { headers });
    const sala = res.data;
    setColegas([sala.professor, ...sala.alunos]);
  };

  const confirmarPresenca = async (id) => {
    await api.put(`/sala/atividades/${id}/confirmar`, {}, { headers });
    carregarAtividades();
  };

  const cancelarPresenca = async (id) => {
    await api.put(`/sala/atividades/${id}/cancelar`, {}, { headers });
    carregarAtividades();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-indigo-300">ClassUP - Aluno</h1>
        <button
          onClick={logout}
          className="text-sm text-red-400 hover:text-red-600 transition"
        >
          Sair
        </button>
      </header>

      {/* Navegador */}
      <nav className="flex justify-center gap-6 text-indigo-300 py-4 border-b border-gray-800">
        <button onClick={() => setAbaAtiva("atividades")}>Atividades</button>
        <button onClick={() => setAbaAtiva("perfil")}>Perfil</button>
        <button onClick={() => setAbaAtiva("colegas")}>Colegas</button>
      </nav>

      {/* Conteúdo */}
      <main className="flex-grow p-6">
        {abaAtiva === "atividades" && (
          <section className="grid gap-6">
            {atividades.map((atividade) => (
              <motion.div
                key={atividade.id}
                className="bg-gray-800 p-4 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-bold text-indigo-300">
                  {atividade.titulo} - {atividade.data}
                </h3>
                <p className="text-sm text-gray-300 mt-2">{atividade.descricao}</p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Status:</span> {atividade.status}
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => confirmarPresenca(atividade.id)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white text-sm"
                  >
                    Confirmar Presença
                  </button>
                  <button
                    onClick={() => cancelarPresenca(atividade.id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-white text-sm"
                  >
                    Cancelar Presença
                  </button>
                </div>
              </motion.div>
            ))}
          </section>
        )}

        {abaAtiva === "perfil" && (
          <section className="text-indigo-300">
            <h2 className="text-2xl font-bold mb-4">Meu Perfil</h2>
            <p><strong>Nome:</strong> {perfil.nomeCompleto}</p>
            <p><strong>Email:</strong> {perfil.email}</p>
            <p><strong>Matrícula:</strong> {perfil.matricula}</p>
            <button className="mt-4 text-sm underline text-indigo-400 hover:text-indigo-500">
              Redefinir Senha (em breve)
            </button>
          </section>
        )}

        {abaAtiva === "colegas" && (
          <section>
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Colegas de Sala</h2>
            <ul className="grid gap-2 text-gray-200">
              {colegas.map((pessoa, idx) => (
                <li key={idx} className="bg-gray-800 p-3 rounded">
                  {pessoa.nomeCompleto} <span className="text-sm text-gray-400">({pessoa.role})</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm py-4 text-gray-500 border-t border-gray-700">
        © {new Date().getFullYear()} ClassUP. Todos os direitos reservados.
      </footer>
    </div>
  );
}