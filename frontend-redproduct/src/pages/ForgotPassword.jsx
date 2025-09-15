import React, { useState } from "react";
import api from "../api";
import AuthCard from "../components/AuthCard";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("/forgot-password", { email });
      setMessage(res.data.message || "Un lien de réinitialisation a été envoyé.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <AuthCard>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <h2 className="text-center text-xl font-semibold text-gray-800">
            Mot de passe oublié ?
          </h2>
          <p className="text-center text-sm text-gray-500">
            Entrez votre e-mail pour recevoir un lien de réinitialisation.
          </p>

          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Envoyer le lien"}
          </button>

          {message && (
            <p className="text-center text-sm mt-2 text-green-600">{message}</p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          <Link to="/login" className="text-yellow-500 font-medium">
            Retour à la connexion
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}
