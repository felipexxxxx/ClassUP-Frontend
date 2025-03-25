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

export async function logoutUsuario(token) {
  await api.post("/user/logout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
