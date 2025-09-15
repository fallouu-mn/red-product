import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api";
import AuthCard from "../components/AuthCard";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation,
      });
      setMessage(res.data.message || "Mot de passe réinitialisé !");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
        <h2 className="text-center text-lg font-medium text-gray-700">
          Réinitialiser le mot de passe
        </h2>

        <input
          type="password"
          className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-rp-blue"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-rp-blue"
          placeholder="Confirmer le mot de passe"
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
        >
          {loading ? "Réinitialisation..." : "Réinitialiser"}
        </button>

        {message && (
          <p className="text-center text-sm mt-2 text-rp-blue">{message}</p>
        )}
      </form>
    </AuthCard>
  );
}
