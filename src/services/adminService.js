import api from "../api/api";

export async function importarUsuarios(listaUsuarios) {
  const response = await api.post("/admin/importar-usuarios", listaUsuarios);
  return response.data;
}
