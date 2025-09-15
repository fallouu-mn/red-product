import React, { useState, useEffect } from "react";

export default function HotelFormModal({ open, hotel, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: "", address: "", email: "", phone: "", price_per_night: "", currency: "XOF"
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hotel) {
      setForm({
        name: hotel.name || "",
        address: hotel.address || "",
        email: hotel.email || "",
        phone: hotel.phone || "",
        price_per_night: hotel.price_per_night || "",
        currency: hotel.currency || "XOF"
      });
    } else {
      setForm({ name: "", address: "", email: "", phone: "", price_per_night: "", currency: "XOF" });
    }
    setImageFile(null);
  }, [hotel, open]);

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) => setImageFile(e.target.files[0] || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    Object.entries(form).forEach(([k,v]) => payload.append(k, v));
    if (imageFile) payload.append('image', imageFile);

    try {
      await onSaved(payload, hotel?.id);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onClose} className="text-gray-500">←</button>
          <h3 className="text-lg font-semibold"> {hotel ? "Modifier l'hôtel" : "Créer un nouvel hôtel"} </h3>
          <div />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nom de l'hôtel" className="col-span-2 p-2 border rounded" required />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Adresse" className="p-2 border rounded" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="E-mail" className="p-2 border rounded" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Numéro de téléphone" className="p-2 border rounded" />
          <input name="price_per_night" value={form.price_per_night} onChange={handleChange} placeholder="Prix par nuit" className="p-2 border rounded" />
          <select name="currency" value={form.currency} onChange={handleChange} className="p-2 border rounded">
            <option value="XOF">XOF</option>
            <option value="EUR">Euro</option>
            <option value="USD">USD</option>
          </select>

          <div className="col-span-2">
            <label className="block mb-2 text-sm">Ajouter une photo</label>
            <input type="file" accept="image/*" onChange={handleFile} />
            {hotel?.image && !imageFile && (
              <p className="text-xs text-gray-500 mt-2">Image actuelle: {hotel.image}</p>
            )}
          </div>

          <div className="col-span-2 flex items-center justify-between mt-4">
            {hotel && (
              <button type="button" onClick={() => {
                if (confirm("Supprimer cet hôtel ?")) {
                  // deletion handling from parent via onSaved with special flag is possible, but easier: parent has delete
                }
              }} className="bg-red-600 text-white px-4 py-2 rounded">Supprimer</button>
            )}
            <div className="flex-1 text-right">
              <button type="button" onClick={onClose} className="px-4 py-2 mr-3">Annuler</button>
              <button type="submit" disabled={loading} className="bg-gray-800 text-white px-4 py-2 rounded">
                {loading ? "Enregistrement..." : (hotel ? "Modifier" : "Créer")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}