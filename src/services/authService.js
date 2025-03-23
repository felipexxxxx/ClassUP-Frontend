import api from "../api/api";

export async function loginUser(credenciais) {
  const response = await api.post("/user/login", credenciais);
  return response.data.accessToken;
}

export async function buscarSalaAluno(token) {
  return await api.get("/sala/aluno", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
