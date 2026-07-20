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
    // Guarantee that headers object exists before setting Authorization
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
    const originalRequest = error.config;
    const status = error.response?.status;
    const isLoginEndPoint = originalRequest.url?.includes("/api/v1/auth/login");

    switch (status) {
      case 401:
        // If it's the login endpoint, just break and let the component handle wrong credentials
        if (isLoginEndPoint) break;

        //  CRITICAL CHANGE: We no longer clear localStorage or redirect here!
        // We let the Promise.reject(error) propagate to the components so they can open the SessionExpiredModal.
        break;

      case 500:
        // Global redirect for internal server errors
        window.location.href = "/500";
        break;
      case 404:
        window.location.href = "/404";
        break;
    }

    // Always reject the promise so components can catch the error and stop spinners/update state safely
    return Promise.reject(error);
  },
);

export default apiClient;
