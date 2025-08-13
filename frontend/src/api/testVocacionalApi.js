import axios from "axios";
import { getEnviarables } from "../helpers/getEnviarables";

const { VITE_API_BACKEND } = getEnviarables();

const testVocacionalApi = axios.create({
  baseURL: VITE_API_BACKEND,
});

testVocacionalApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (!config.headers.Authorization && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!config.headers["x-token"] && token) {
    config.headers["x-token"] = token;
  }

  
  return config;
});

export default testVocacionalApi;
