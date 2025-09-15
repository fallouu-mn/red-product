import React from 'react';

export default function AuthCard({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md relative">
        {/* Logo */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded shadow">
          <span className="font-bold">RED PRODUCT</span>
        </div>
        {children}
      </div>
    </div>
  );
}
