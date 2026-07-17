import axios from "axios";

const API_BASE_URL = "http://localhost:8081";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.error("Network Error / Server is Down");
      return Promise.reject(error);
    }
    const { status } = error.response;
    switch (status) {
      case 401:
        console.warn("Session expirée, redirection ou modal...");
        window.dispatchEvent(new CustomEvent("session-expired"));
        break;

      case 403:
        window.location.href = "/403";
        break;

      case 500:
        if (error.config.method === "get") {
          window.location.href = "/500";
        } else {
          console.error("Internal Server Error on Action");
        }
        break;

      default:
        break;
    }
    return Promise.reject(error);
  },
);

export default apiClient;
