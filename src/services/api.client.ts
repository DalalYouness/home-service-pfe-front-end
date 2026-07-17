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
    // config.headers c'est just comme un garantie que le headers n'est pas undefined
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // c'est rare mais c'est just pour garantire si c'est vraiment  une erreur au moments de l'interception de requtte on le cache
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

      // si le code status rah 500 , hna drna check wach l methode hiya l get ila kant hiya l get f request
      // f machi mochkil anaho nredirigew mobachara l chi page katgolih rah kayn error intern
      // walakin la kant post / put / delete rah logiquement makhasch luser nkharoj man lpage khas ntal3o lih ghir
      // chi modal
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
    // rah darouri l composant khas darouri nraj3o lih bali rah fachlat l3amaliya fl 7alat dyal redirect
    // composant maghaykon endo maydir biha walakin f 7ala dyal la kana ghadi ntal3o ghir chi modal sghir ola chi haja
    // had l error ghaynf3 bzf l composant bach ybdl state dyalo mataln yhbas spinner ola chi haja haka
    return Promise.reject(error);
  },
);

export default apiClient;
