import axios from "axios";

const api = axios.create({
  baseURL: "https://agendaedu-backend-production.up.railway.app", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Requisição com config:", config); 
  return config;
});

export default api;
