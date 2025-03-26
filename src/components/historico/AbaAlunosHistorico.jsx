import React from "react";

export default function AbaAlunosHistorico({ alunos, professor }) {
  return (
    <>
      <h2 className="text-5xl font-bold text-indigo-300 mb-8">
        Alunos <span className="text-indigo-400 text-2xl">({alunos.length + 1})</span>
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <li className="bg-gray-800 px-6 py-6 min-h-[120px] rounded-2xl shadow-md hover:shadow-indigo-500/20 hover:bg-gray-700 hover:scale-[1.02] transition-all duration-200 ease-in-out">
          <div className="text-xl font-semibold text-white mb-1 break-words">
            {professor.nome}
          </div>
          <div className="text-sm text-indigo-300">Professor(a)</div>
        </li>
        {alunos.map((aluno) => (
          <li
            key={aluno.id}
            className="bg-gray-800 px-6 py-6 min-h-[120px] rounded-2xl shadow-md hover:shadow-indigo-500/20 hover:bg-gray-700 hover:scale-[1.02] transition-all duration-200 ease-in-out"
          >
            <div className="text-xl font-semibold text-white mb-1 break-words">
              {aluno.nome}
            </div>
            <div className="text-sm text-indigo-300">Aluno(a)</div>
          </li>
        ))}
      </ul>
    </>
  );
}
