import React from "react";

export default function StatCard({ color, icon, title, value, description }) {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <div className={`p-3 rounded-full text-white ${color}`}>
        {icon}
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-semibold text-gray-700">{value}</h4>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}
