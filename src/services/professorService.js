import api from "../api/api";

export async function buscarSalasProfessor() {
  const response = await api.get("/professor/sala");
  return response.data;
}

export async function criarSala(nome) {
  const response = await api.post("/professor/sala", { nome });
  return response.data;
}

export async function encerrarSemestre() {
  const response = await api.post("/professor/sala/encerrar");
  return response.data;
}

export async function buscarSalaPorId(salaId) {
  const response = await api.get(`/professor/sala/${salaId}`);
  return response.data;
}

export async function criarAtividadeApi(atividade) {
  const response = await api.post("/professor/sala/atividades", atividade);
  return response.data;
}

export const editarAtividadeApi = async (id, dados) => {
  return await api.put(`/professor/sala/atividades/${id}`, dados);
};

export async function deletarAtividadeApi(id) {
  return await api.delete(`/professor/sala/atividades/${id}`);
};

export const criarAvisoApi = async (dados) => {
  return await api.post("/professor/sala/avisos", dados);
};

export const editarAvisoApi = async (id, dados) => {
  return await api.put(`/professor/sala/avisos/${id}`, dados);
};

export const excluirAvisoApi = async (id) => {
  return await api.delete(`/professor/sala/avisos/${id}`);
};

export const removerAlunoApi = async (alunoId) => {
  return await api.delete(`/professor/sala/aluno/${alunoId}`);
};

export const buscarResumoAtividadeApi = async (id) => {
  const response = await api.get(`/professor/sala/atividades/${id}/resumo`);
  return response.data;
};
