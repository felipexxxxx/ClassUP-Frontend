import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import formatarData from "../utils/formatarData";

export default function TelaAlunoSala() {
  const [atividades, setAtividades] = useState([]);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [colegas, setColegas] = useState([]);
  const [perfil, setPerfil] = useState({});
  const [nomeSala, setNomeSala] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("atividades");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    carregarAtividades();
    carregarColegas();
    carregarPerfil();
  }, []);

  useEffect(() => {
    if (mensagemSucesso) {
      const timer = setTimeout(() => setMensagemSucesso(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagemSucesso]);

  const carregarAtividades = async () => {
    const res = await api.get("/sala/atividades", { headers });
    setAtividades(res.data);
  };

  const carregarColegas = async () => {
    const res = await api.get("/sala/detalhes", { headers });
    const sala = res.data;
    setNomeSala(sala.nome);
    setColegas([sala.professor, ...sala.alunos]);
  };

  const carregarPerfil = async () => {
    const res = await api.get("/user", { headers });
    setPerfil(res.data);
  };

  const confirmarPresenca = async (id) => {
    try {
      await api.put(`/sala/atividades/${id}/confirmar`, {}, { headers });
      await carregarAtividades();
      setMensagemSucesso("Presença confirmada com sucesso!");
      setAtividadeSelecionada(null);
    } catch (err) {
      console.error("Erro ao confirmar presença:", err);
    }
  };

  const cancelarPresenca = async (id) => {
    try {
      await api.put(`/sala/atividades/${id}/cancelar`, {}, { headers });
      await carregarAtividades();
      setMensagemSucesso("Presença cancelada com sucesso!");
      setAtividadeSelecionada(null);
    } catch (err) {
      console.error("Erro ao cancelar presença:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header nomeSala={nomeSala} />

      <nav className="flex justify-center gap-16 text-indigo-300 py-6 border-b border-gray-800 text-xl font-medium">
        {[
          { id: "atividades", label: "Atividades" },
          { id: "colegas", label: "Colegas" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAbaAtiva(tab.id)}
            className={`relative pb-2 transition-all duration-300 ${
              abaAtiva === tab.id ? "text-white font-bold scale-105" : "text-indigo-300 hover:text-white"
            }`}
          >
            {tab.label}
            {abaAtiva === tab.id && (
              <motion.span layoutId="underline" className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-400 rounded"></motion.span>
            )}
          </button>
        ))}
      </nav>

      <main className="flex-grow p-10 max-w-7xl mx-auto">
        {mensagemSucesso && (
          <AnimatePresence>
            <motion.div
              key="sucesso"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 bg-green-700 text-white text-center py-2 px-4 rounded shadow"
            >
              {mensagemSucesso}
            </motion.div>
          </AnimatePresence>
        )}

        {abaAtiva === "atividades" && (
          <>
            <h2 className="text-4xl font-bold text-indigo-300 mb-8">Atividades</h2>
            <section className="grid gap-8">
              {atividades.map((atividade) => (
                <motion.div
                  key={atividade.id}
                  onClick={() => setAtividadeSelecionada(atividade)}
                  className="bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-indigo-500/20 transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-3xl font-bold text-indigo-300 mb-2">
                    {atividade.titulo} <span className="text-base text-gray-400">({formatarData(atividade.data)})</span>
                  </h3>
                  <p className="text-lg text-gray-300 mb-2 leading-relaxed">{atividade.descricao}</p>
                  <p className="text-md">
                    <span className="font-semibold text-gray-400">Status:</span>{" "}
                    <span className="text-indigo-200 font-semibold">{atividade.status}</span>
                  </p>
                </motion.div>
              ))}
            </section>

            <AnimatePresence>
              {atividadeSelecionada && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setAtividadeSelecionada(null)}
                >
                  <motion.div
                    className="bg-gray-800 p-8 rounded-2xl max-w-xl w-full shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                  >
                    <h2 className="text-3xl font-bold text-indigo-300 mb-2">{atividadeSelecionada.titulo}</h2>
                    <p className="text-sm text-gray-400 mb-2">{formatarData(atividadeSelecionada.data)}</p>
                    <p className="text-gray-300 mb-2">{atividadeSelecionada.descricao}</p>
                    <p className="text-gray-300 mb-6">
                      Local: <span className="text-indigo-200">{atividadeSelecionada.local || "Não informado"}</span>
                    </p>
                    <p className="mb-6">
                      <span className="font-semibold text-gray-400">Status:</span>{" "}
                      <span className="text-indigo-200 font-semibold">{atividadeSelecionada.status}</span>
                    </p>
                    <div className="flex gap-4 justify-end">
                      <button
                        onClick={() => confirmarPresenca(atividadeSelecionada.id)}
                        disabled={atividadeSelecionada.status !== "PENDENTE"}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 rounded-full text-white text-sm font-semibold"
                      >
                        Confirmar Presença
                      </button>
                      <button
                        onClick={() => cancelarPresenca(atividadeSelecionada.id)}
                        disabled={atividadeSelecionada.status !== "PENDENTE"}
                        className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 rounded-full text-white text-sm font-semibold"
                      >
                        Cancelar Presença
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {abaAtiva === "colegas" && (
          <>
            <h2 className="text-4xl font-bold text-indigo-300 mt-10 mb-6">Colegas de Sala</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {colegas.map((pessoa, idx) => (
                <li
                  key={idx}
                  className="bg-gray-800 px-6 py-5 rounded-xl shadow-md hover:shadow-indigo-500/10 transition-all"
                >
                  <div className="text-lg text-white font-medium mb-1">{pessoa.nome}</div>
                  <div className="text-sm text-indigo-300">
                    {pessoa.id === perfil.id
                      ? "Você"
                      : idx === 0
                      ? "Professor(a)"
                      : "Aluno(a)"}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
