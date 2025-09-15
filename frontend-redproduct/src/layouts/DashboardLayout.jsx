import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const [search, setSearch] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const ok = window.confirm("Voulez-vous vraiment vous déconnecter ?");
    if (!ok) return;
    localStorage.removeItem("rp_token");
    localStorage.removeItem("rp_user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white flex flex-col shadow-xl
        lg:translate-x-0 lg:static lg:inset-0
        transition duration-300 ease-in-out transform
      `}>
        {/* Logo/Brand */}
        <div className="px-6 py-5 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RP</span>
              </div>
              <span className="text-xl font-bold">RED PRODUCT</span>
            </div>
            
            {/* Bouton fermer sur mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          {/* Section Principal */}
          <div className="px-6 pb-4">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Principal</h2>
          </div>
          
          <div className="space-y-1">
            <NavLink
              to="/dashboard"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-6 py-4 text-base font-medium transition-colors duration-200 ${
                  isActive 
                    ? "bg-gray-700 text-white" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h4v4H3V3zm6 0h4v4H9V3zm6 0h4v4h-4V3zM3 9h4v4H3V9zm6 0h4v4H9V9zm6 0h4v4h-4V9zM3 15h4v4H3v-4zm6 0h4v4H9v-4zm6 0h4v4h-4v-4z"/>
              </svg>
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/hotels"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-6 py-4 text-base font-medium transition-colors duration-200 ${
                  isActive 
                    ? "bg-gray-700 text-white" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              <span>Liste des hôtels</span>
            </NavLink>
          </div>
        </nav>

        {/* User Profile dans la sidebar */}
        <div className="px-6 py-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40"
                alt="user"
                className="w-10 h-10 rounded-full border-2 border-gray-600"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Fallouuu Ndiaye</p>
              <p className="text-xs text-gray-400">en ligne</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header moderne */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            {/* Menu burger + Titre */}
            <div className="flex items-center space-x-4">
              {/* Menu hamburger pour mobile */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1 hidden sm:block">Gérez vos hôtels depuis ce panel d'administration</p>
              </div>
            </div>

            {/* Actions du header */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Barre de recherche */}
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-48 lg:w-64"
                />
              </div>

              {/* Version mobile de la recherche */}
              <button className="sm:hidden p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.405-3.405A2.032 2.032 0 0116 11V7a4 4 0 10-8 0v4c0 .701-.286 1.338-.595 1.905L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs">
                  3
                </span>
              </button>

              {/* Menu utilisateur */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <img
                    src="https://i.pravatar.cc/35"
                    alt="profile"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">Fallouuu Ndiaye</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Fallouuu Ndiaye</p>
                      <p className="text-xs text-gray-500">fallou@example.com</p>
                    </div>
                    
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mon profil
                    </button>
                    
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Paramètres
                    </button>
                    
                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Zone de rendu des pages */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}