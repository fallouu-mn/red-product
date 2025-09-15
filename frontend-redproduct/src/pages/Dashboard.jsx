// src/pages/Dashboard.jsx
import React from "react";
import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Voulez-vous vraiment vous déconnecter ?");
    if (!confirmLogout) return; // si on clique sur Annuler, rien ne se passe

    // si on clique sur Oui
    localStorage.removeItem("rp_token");
    localStorage.removeItem("rp_user");
    navigate("/login");
  };

  const stats = [
    { title: "Formulaires", value: 125, color: "bg-purple-500", description: "Demo", icon: "📄" },
    { title: "Messages", value: 40, color: "bg-green-500", description: "Demo", icon: "💬" },
    { title: "Emails", value: 25, color: "bg-red-500", description: "Demo", icon: "📧" },
    { title: "Hôtels", value: 40, color: "bg-pink-500", description: "Demo", icon: "🏨" },
    { title: "Utilisateurs", value: 600, color: "bg-yellow-400", description: "Demo", icon: "👥" },
    { title: "Entités", value: 2, color: "bg-blue-500", description: "Demo", icon: "🏢" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Bienvenue sur RED Product
        </h1>


      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((s, idx) => (
          <StatCard key={idx} {...s} />
        ))}
      </div>
    </div>
  );
}
