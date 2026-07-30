// Application Setup - Step 1: Configure the centralized HTTP client
// done hmudlilah
import axios from "axios";
import { toast } from "sonner";
import { AppEvent } from "../events/appEvents";

// Retrieve the base URL from environment variables, defaulting to local setup
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:9999";

// Create a centralized Axios instance for all application HTTP requests
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Bearer Token to outgoing requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Centralized Event-Driven Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const isLoginEndPoint =
      originalRequest?.url?.includes("/api/v1/auth/login");

    // Handle complete network failures or offline server state
    if (!error.response) {
      toast.error(
        "Une erreur est survenue. Veuillez réessayer dans quelques instants.",
      );
      return Promise.reject(error);
    }

    // Dispatch global application events based on HTTP response status codes.
    // Listeners in the global layout/router will catch these events for SPA navigation.
    switch (status) {
      case 401:
        // Ignore 401 errors on the login endpoint to allow the login form to show invalid credentials
        if (!isLoginEndPoint) {
          window.dispatchEvent(new Event(AppEvent.SESSION_EXPIRED));
        }
        break;

      case 404:
        // no event because we will throw toast notification diretly
        toast.error("La ressource demandée est introuvable.");
        break;

      case 500:
        // Dispatch event for unhandled internal server exceptions
        window.dispatchEvent(new Event(AppEvent.INTERNAL_SERVER_ERROR));
        break;

      // Ignore all other HTTP status codes and let the calling code handle them if needed.
      default:
        break;
    }

    // Always reject the promise so calling components can clear loading states or catch local errors
    return Promise.reject(error);
  },
);

export default apiClient;
