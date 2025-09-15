import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("rp_token");
    console.log("🔑 Token récupéré:", token ? `${token.substring(0, 20)}...` : 'AUCUN TOKEN');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Header Authorization ajouté");
    } else {
      console.log("❌ Aucun token trouvé dans localStorage");
    }
    
    console.log("📤 Requête sortante:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: {
        ...config.headers,
        Authorization: config.headers.Authorization ? '*** TOKEN MASQUÉ ***' : 'NON DÉFINI'
      }
    });
    
    return config;
  },
  (error) => {
    console.error("❌ Erreur dans l'intercepteur de requête:", error);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    console.log("✅ Réponse reçue:", {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error("❌ Erreur API détaillée:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
      headers: error.response?.headers
    });

    if (error.response?.status === 401) {
      console.log("🔐 Erreur 401 - Suppression des tokens et redirection");
      localStorage.removeItem("rp_token");
      localStorage.removeItem("rp_user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;