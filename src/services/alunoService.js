import api from "../api/api";

export async function buscarSalaCompletaDoAluno() {
  const res = await api.get("/aluno/sala/detalhes");
  return res.data;
}


export async function entrarNaSala(codigoAcesso) {
  return await api.post("/aluno/sala/entrar", { codigoAcesso });
}


export async function confirmarPresencaAtividade(id) {
  await api.put(`/aluno/sala/atividades/${id}/confirmar`);
}


export async function cancelarPresencaAtividade(id) {
  await api.put(`/aluno/sala/atividades/${id}/cancelar`);
}



