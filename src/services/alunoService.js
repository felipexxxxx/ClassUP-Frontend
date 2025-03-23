import api from "../api/api";

// Busca as atividades da sala do aluno
export async function buscarAtividades() {
  const res = await api.get("/sala/atividades");
  return res.data;
}

// Busca os colegas e o nome da sala
export async function buscarColegas() {
  const res = await api.get("/sala/detalhes");
  return res.data;
}

// Busca o perfil do usuário logado
export async function buscarPerfil() {
  const res = await api.get("/user");
  return res.data;
}

// Confirma a presença em uma atividade
export async function confirmarPresencaAtividade(id) {
  await api.put(`/sala/atividades/${id}/confirmar`);
}

// Cancela a presença em uma atividade
export async function cancelarPresencaAtividade(id) {
  await api.put(`/sala/atividades/${id}/cancelar`);
}
