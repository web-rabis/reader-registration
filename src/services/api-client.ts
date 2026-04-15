
import axios from "axios";
import { toast } from "sonner";

// В будущем это будет взято из переменных окружения
const API_URL = import.meta.env.VITE_API_URL || "/api";
const BASENAME = import.meta.env.VITE_APP_BASENAME || "/";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавляем JWT токен к запросам
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("librarian-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обрабатываем ошибки
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("librarian-token");
      alert(`${BASENAME}login`)
        window.location.href = `${BASENAME}login`;
      toast.error("Сессия истекла. Пожалуйста, войдите снова.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
