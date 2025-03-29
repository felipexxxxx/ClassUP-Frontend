import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import Header from "../components/layout/Header";
import { BsUpload } from "react-icons/bs";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function TelaAdmin() {
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const { importar, mensagem, sucesso, carregando } = useAdmin();

  const handleArquivo = (e) => {
    const file = e.target.files[0];
    setArquivoSelecionado(file);
  };

  const handleImportar = async () => {
    if (!arquivoSelecionado) return alert("Selecione um arquivo.");
    const formData = new FormData();
    formData.append("file", arquivoSelecionado);
    await importar(formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header exibirSala={false} />

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-400">
            Importar Usuários
          </h2>

          <input
            type="file"
            accept=".csv,.sql,.json,.xlsx"
            onChange={handleArquivo}
            className="block w-full text-sm text-gray-300 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
          />

          <button
            onClick={handleImportar}
            disabled={carregando || !arquivoSelecionado}
            className={`w-full mt-4 flex justify-center items-center gap-2 px-4 py-3 rounded-md font-semibold transition duration-200 ${
              carregando
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {carregando ? (
              <span className="animate-pulse">Importando...</span>
            ) : (
              <>
                <BsUpload className="text-lg" />
                Importar usuários
              </>
            )}
          </button>

          {mensagem && (
            <div
              className={`mt-6 p-4 rounded-md text-center text-sm font-medium ${
                sucesso
                  ? "text-green-400 bg-green-900/30 border border-green-600"
                  : "text-red-400 bg-red-900/30 border border-red-600"
              }`}
            >
              <div className="flex justify-center items-center gap-2">
                {sucesso ? (
                  <FaCheckCircle className="text-green-400" />
                ) : (
                  <FaExclamationTriangle className="text-red-400" />
                )}
                <span>{mensagem}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
