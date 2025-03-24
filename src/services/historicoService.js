import api from "../api/api";

export async function buscarHistorico() {
  const response = await api.get("sala/historico");
  return response.data;
}

export async function buscarDetalhesHistorico(id) {
  const response = await api.get(`/sala/historico/${id}`);
  return response.data;
}
