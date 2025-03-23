import api from "../api/api";

// Buscar perfil do usuário
export async function buscarPerfil() {
  const res = await api.get("/user");
  return res.data;
}

// Atualizar email do usuário
export async function atualizarEmail(novoEmail) {
  return api.put("/user/email", { novoEmail });
}

// Atualizar senha do usuário
export async function atualizarSenha(senhaAtual, novaSenha) {
  return api.put("/user/senha", { senhaAtual, novaSenha });
}
