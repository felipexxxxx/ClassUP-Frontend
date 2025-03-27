export default function formatarData(dataString) {
  const data = new Date(dataString);
  data.setHours(data.getHours() - 3);

  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const hora = data.getHours().toString().padStart(2, "0");
  const minutos = data.getMinutes().toString().padStart(2, "0");
  return `${dia}/${mes} às ${hora}:${minutos}`;
}

  
export function formatarDataSimples(dataString) {
  const data = new Date(dataString);
  data.setHours(data.getHours() - 3);

  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
