import api from "../api/api";

export async function buscarSalasProfessor() {
  const token = localStorage.getItem("token");
  const response = await api.get("/sala", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}


export async function buscarDetalhesSala(salaId) {
  const token = localStorage.getItem("token");
  const response = await api.get(`/sala/${salaId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
