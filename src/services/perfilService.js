import api from "../api/api";

export async function buscarPerfil() {
  const res = await api.get("/user");
  return res.data;
}

export async function atualizarEmail(novoEmail) {
  return api.put("/user/email", { novoEmail });
}

export async function atualizarSenha(senhaAtual, novaSenha) {
  return api.put("/user/senha", { senhaAtual, novaSenha });
}
