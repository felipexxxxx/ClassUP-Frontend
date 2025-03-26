import api from "../api/api";

export async function buscarSalasProfessor() {
  const token = localStorage.getItem("token");
  const response = await api.get("/sala", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function criarSala(nome) {
  const token = localStorage.getItem("token");
  const response = await api.post(
    "/sala",
    { nome },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function encerrarSemestre() {
  const token = localStorage.getItem("token");
  const response = await api.post("/sala/encerrar", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function buscarSalaPorId(salaId) {
  const token = localStorage.getItem("token");
  const response = await api.get(`/sala/${salaId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function criarAtividadeApi(atividade) {
  const token = localStorage.getItem("token");
  const response = await api.post("/sala/atividades", atividade, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}


export const editarAtividadeApi = async (id, dados) => {
  const token = localStorage.getItem("token");
  return await api.put(`/sala/atividades/${id}`, dados, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};


export async function deletarAtividadeApi(id) {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  return await api.delete(`/sala/atividades/${id}`, { headers });
}


export const criarAvisoApi = async (dados) => {
  const token = localStorage.getItem("token");
  return await api.post("/sala/avisos", dados, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editarAvisoApi = async (id, dados) => {
  const token = localStorage.getItem("token");
  return await api.put(`/sala/avisos/${id}`, dados, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const excluirAvisoApi = async (id) => {
  const token = localStorage.getItem("token");
  return await api.delete(`/sala/avisos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const removerAlunoApi = async (alunoId) => {
  const token = localStorage.getItem("token");
  return await api.delete(`/sala/aluno/${alunoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const buscarResumoAtividadeApi = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/sala/atividades/${id}/resumo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

