import React, { useState } from 'react';
import { Menu, Upload, Clock, Settings } from 'lucide-react';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barra lateral */}
      <aside className={`${isSidebarOpen ? 'block' : 'hidden'} md:flex flex-col w-64 bg-white shadow-md`}>
        <div className="p-5">
          <h2 className="text-2xl font-semibold text-green-medium">AI Análisis</h2>
        </div>
        <nav className="flex-1">
          <a
            href="/analisis"
            className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-200"
          >
            <Upload className="mr-3 text-green-medium" size={20} />
            Cargar imagen
          </a>
          <a
            href="/historial"
            className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-200"
          >
            <Clock className="mr-3 text-green-medium" size={20} />
            Historial de análisis
          </a>
          <a
            href="#"
            className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-200"
          >
            <Settings className="mr-3 text-green-medium" size={20} />
            Ajustes
          </a>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="md:hidden text-gray-500 focus:outline-none">
                <Menu size={24} />
              </button>
              <h1 className="ml-2 text-xl font-semibold text-green-medium">AI TeachgranAssist</h1>
            </div>
            <nav className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">Perfil</a>
            </nav>
          </div>
        </header>

        {/* Área de contenido */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
