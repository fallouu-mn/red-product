import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      // ✅ On n’enregistre pas le token pour forcer l’utilisateur à se connecter
      alert("Inscription réussie ! Veuillez vous connecter.");
      navigate("/login"); // redirection vers login
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur lors de l'inscription");
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
            Créez un compte
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="falloudiaye778742285@gmail.com"
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

            <div>
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-8 bg-slate-700 text-white font-medium rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Création..." : "S'inscrire"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Déjà un compte ?{" "}
              <Link 
                to="/login" 
                className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
