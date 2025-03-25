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

