import React from "react";
import { FaTrash } from "react-icons/fa";
import ModalConfirmarExclusao from "../modals/ModalConfirmarExclusao";

export default function AbaAlunosProfessor({ dados, modais, setModais, removerAluno, setMensagemSucesso }) {
  const { alunos, professor } = dados;
  const [removendo, setRemovendo] = React.useState(false);

  const handleRemoverAluno = async () => {
    setRemovendo(true);
    await removerAluno(modais.alunoRemovendo.id);
    setMensagemSucesso("Aluno removido com sucesso!");
    setModais({ ...modais, alunoRemovendo: null });
    setRemovendo(false);
  };

  return (
    <>
      <h2 className="text-5xl font-bold text-indigo-300 mb-8">
        Alunos <span className="text-indigo-400 text-2xl">({alunos.length + 1})</span>
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <li className="bg-gray-800 px-6 py-6 min-h-[120px] rounded-2xl shadow-md hover:shadow-indigo-500/20 hover:bg-gray-700 hover:scale-[1.02] transition-all duration-200 ease-in-out">
          <div className="text-xl font-semibold text-white mb-1 break-words">
            {professor.nomeCompleto}
          </div>
          <div className="text-sm text-indigo-300">Professor(a)</div>
        </li>

        {alunos.map((pessoa) => (
          <li
            key={pessoa.id}
            className="bg-gray-800 px-6 py-6 min-h-[120px] rounded-2xl shadow-md hover:shadow-indigo-500/20 hover:bg-gray-700 hover:scale-[1.02] transition-all duration-200 ease-in-out flex justify-between items-start"
          >
            <div className="pr-4">
              <div className="text-xl font-semibold text-white mb-1 break-words">
                {pessoa.nomeCompleto}
              </div>
              <div className="text-sm text-indigo-300">Aluno(a)</div>
            </div>
            <button
              onClick={() => setModais({ ...modais, alunoRemovendo: pessoa })}
              className="text-red-500 hover:text-red-300 text-xl mt-1"
              title="Remover aluno"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>

      {modais.alunoRemovendo && (
        <ModalConfirmarExclusao
          titulo="Remover Aluno"
          mensagem={
            removendo
              ? "Removendo aluno, aguarde..."
              : `Deseja realmente remover o aluno "${modais.alunoRemovendo.nomeCompleto}" da sala?`
          }
          onClose={() => !removendo && setModais({ ...modais, alunoRemovendo: null })}
          onConfirm={handleRemoverAluno}
          desativarConfirmar={removendo}
        />
      )}
    </>
  );
}
