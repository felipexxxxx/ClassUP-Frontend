import api from "../api/api";

// Busca as atividades da sala do aluno
export async function buscarAtividades() {
  const res = await api.get("/aluno/sala/atividades");
  return res.data;
}

// Busca os colegas e o nome da sala
export async function buscarColegas() {
  const res = await api.get("/sala/detalhes");
  return res.data;
}

export async function entrarNaSala(codigoAcesso, token) {
  return await api.post(
    "/aluno/sala/entrar",
    { codigoAcesso },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}


// Confirma a presença em uma atividade
export async function confirmarPresencaAtividade(id) {
  await api.put(`/aluno/sala/atividades/${id}/confirmar`);
}

// Cancela a presença em uma atividade
export async function cancelarPresencaAtividade(id) {
  await api.put(`/aluno/sala/atividades/${id}/cancelar`);
}

// Busca os avisos da sala
export async function buscarAvisos() {
  const res = await api.get("/sala/avisos");
  return res.data;
}
