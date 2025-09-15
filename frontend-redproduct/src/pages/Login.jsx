import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/login", { email, password });
      
      console.log("Réponse brute:", res.data);
      
      // CORRECTION : Gérer la réponse corrompue "php{...}"
      let responseData = res.data;
      
      // Si la réponse est une string qui commence par "php{"
      if (typeof res.data === 'string' && res.data.startsWith('php{')) {
        console.log("⚠️ Réponse corrompue détectée, nettoyage...");
        const cleanJsonString = res.data.substring(3); // Enlever "php"
        responseData = JSON.parse(cleanJsonString);
        console.log("✅ Données nettoyées:", responseData);
      }
      
      // Vérifier que les données nécessaires sont présentes
      if (!responseData.token || !responseData.user) {
        throw new Error("Token ou utilisateur manquant dans la réponse");
      }
      
      // Stocker les données
      localStorage.setItem("rp_token", responseData.token);
      localStorage.setItem("rp_user", JSON.stringify(responseData.user));
      
      // Vérification immédiate
      const storedToken = localStorage.getItem("rp_token");
      console.log("🔍 Token stocké avec succès:", storedToken ? "OUI" : "NON");
      console.log("👤 Utilisateur:", responseData.user.name);
      
      navigate("/dashboard");
      
    } catch (err) {
      console.error("Erreur de connexion:", err);
      alert(err.response?.data?.message || err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-bold tracking-wide">RED PRODUCT</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            Se connecter
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-8 bg-slate-700 text-white font-medium rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="text-center mt-6 space-y-3">
            <p className="text-gray-600 text-sm">
              Pas encore inscrit ?{" "}
              <Link 
                to="/register" 
                className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
              >
                Créez un compte
              </Link>
            </p>
            <p className="text-gray-500 text-sm">
              <Link 
                to="/forgot-password" 
                className="hover:text-gray-700 transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}