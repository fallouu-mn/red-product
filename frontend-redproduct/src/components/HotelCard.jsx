// src/components/HotelCard.jsx
import React from "react";

export default function HotelCard({ hotel, onEdit, onDelete }) {
  const base = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/api\/?$/,'');
  const img = hotel.image ? `${base}/storage/${hotel.image}` : `https://via.placeholder.com/600x300?text=${encodeURIComponent(hotel.name)}`;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image avec overlay au hover */}
      <div className="relative overflow-hidden">
        <img 
          src={img} 
          alt={hotel.name} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      
      {/* Contenu principal */}
      <div className="p-6">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm text-gray-500 font-medium">{hotel.address}</p>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <p className="text-lg font-semibold text-gray-900">
              {hotel.price_per_night ? `${hotel.price_per_night} ${hotel.currency}` : 'Prix non disponible'}
            </p>
            {hotel.price_per_night && (
              <span className="text-sm text-gray-500 font-normal">par nuit</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Zone des actions avec design moderne */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onEdit(hotel)}
            className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="flex items-center justify-center gap-2 relative z-10">
              <svg className="w-4 h-4 transition-transform duration-200 group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-200"></div>
          </button>
          
          <button 
            onClick={() => onDelete(hotel)}
            className="group/btn relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <div className="flex items-center justify-center gap-2 relative z-10">
              <svg className="w-4 h-4 transition-transform duration-200 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Supprimer
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-200"></div>
          </button>
        </div>
      </div>
    </div>
  );
}