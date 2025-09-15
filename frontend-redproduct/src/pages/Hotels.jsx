import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../api";
import HotelCard from "../components/HotelCard";
import HotelFormModal from "../components/HotelFormModal";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { search } = useOutletContext() || { search: "" };

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("rp_token");
    console.log("🔍 Vérification token:", token ? "PRÉSENT" : "ABSENT");

    if (!token) {
      setError("Token manquant - redirection vers la connexion");
      navigate("/login");
      return;
    }

    try {
      console.log("📡 Tentative de récupération des hôtels...");
      const res = await api.get("/hotels");

      let hotelsData = [];

      if (typeof res.data === "string") {
        const cleaned = res.data.replace(/^php/, "");
        hotelsData = JSON.parse(cleaned);
      } else if (Array.isArray(res.data)) {
        hotelsData = res.data;
      } else if (Array.isArray(res.data.data)) {
        hotelsData = res.data.data;
      }

      setHotels(hotelsData);
      console.log(`📋 ${hotelsData.length} hôtel(s) chargé(s)`);
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des hôtels:", err);
      if (err.response?.status === 401) {
        setError("Session expirée - veuillez vous reconnecter");
        localStorage.removeItem("rp_token");
        localStorage.removeItem("rp_user");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Impossible de récupérer les hôtels");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateOrUpdate = async (formData, id = null) => {
    try {
      let response;
      if (id) {
        response = await api.post(`/hotels/${id}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await api.post("/hotels", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      console.log("✅ Réponse sauvegarde:", response.data);
      await fetchHotels();
      setModalOpen(false);
    } catch (err) {
      console.error("❌ Erreur sauvegarde:", err);
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(", ")
          : "Erreur lors de la sauvegarde");
      alert("Erreur: " + errorMessage);
    }
  };

  const handleDelete = async (hotel) => {
    if (!confirm(`Supprimer ${hotel.name} ?`)) return;
    try {
      await api.delete(`/hotels/${hotel.id}`);
      setHotels(hotels.filter((h) => h.id !== hotel.id));
    } catch (err) {
      console.error("Erreur suppression:", err);
      alert(err.response?.data?.message || "Erreur suppression");
    }
  };

  // ✅ Filtrage avec la recherche globale
  const filtered = hotels.filter((h) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      (h.name && h.name.toLowerCase().includes(s)) ||
      (h.address && h.address.toLowerCase().includes(s)) ||
      (String(h.price_per_night || "").toLowerCase().includes(s))
    );
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg max-w-md">
          <div className="text-red-600 text-xl mb-4">⚠️ Erreur</div>
          <div className="text-red-700 mb-4">{error}</div>
          <button
            onClick={fetchHotels}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Liste des Hôtels</h1>
          <p className="text-gray-500">Gérez vos hôtels</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Créer un nouvel hôtel
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Chargement des hôtels...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Aucun hôtel disponible
            </div>
          ) : (
            filtered.map((h) => (
              <HotelCard
                key={h.id}
                hotel={h}
                onEdit={() => {
                  setEditing(h);
                  setModalOpen(true);
                }}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      )}

      <HotelFormModal
        open={modalOpen}
        hotel={editing}
        onClose={() => setModalOpen(false)}
        onSaved={handleCreateOrUpdate}
      />
    </div>
  );
}
