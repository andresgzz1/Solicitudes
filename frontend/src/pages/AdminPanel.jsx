import { useState } from "react";
import SolicitudesNuevasAdmin from "../components/admin/SolicitudesNuevasAdmin";
import SolicitudesEnCurso from "../components/admin/SolicitudesEnCurso";
import SolicitudesCerradas from "../components/admin/SolicitudesCerradas";

function AdminPanel({ onLogout }) {
  const [activeSection, setActiveSection] = useState("");
  const [isHovering, setIsHovering] = useState(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo HD optimizado */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/image.png" 
          alt="Fondo abstracto azul" 
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 to-slate-900/60"></div>
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Navbar con transparencia */}
        <nav className="bg-slate-900/90 backdrop-blur-sm shadow-xl p-4 flex justify-between items-center sticky top-0 z-10">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="h-10 w-auto filter brightness-0 invert" 
          />
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">
                Admin <span className="font-light"></span>
              </h1>
            </div>
            <button
              onClick={onLogout}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
            >
              <span>Cerrar sesión</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Contenido */}
        <div className="p-6 max-w-7xl mx-auto">
          {/* Tarjetas */}
          <div className="grid gap-8 md:grid-cols-3 mb-10">
            {[
              { id: "nuevas", icon: "🆕", label: "Nuevas", color: "from-blue-600 to-cyan-600", desc: "Solicitudes pendientes" },
              { id: "En_curso", icon: "🔄", label: "En Proceso", color: "from-amber-600 to-orange-600", desc: "Solicitudes activas" },
              { id: "cerradas", icon: "✅", label: "Cerradas", color: "from-emerald-600 to-green-600", desc: "Historial completo" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                onMouseEnter={() => setIsHovering(item.id)}
                onMouseLeave={() => setIsHovering(null)}
                className={`bg-gradient-to-br ${item.color} rounded-2xl p-1 shadow-lg transition-all duration-500 ${isHovering === item.id ? 'transform -translate-y-2 shadow-xl' : ''}`}
              >
                <div className="bg-white/95 rounded-xl p-6 h-full flex flex-col items-center justify-center transition-all duration-300 hover:bg-opacity-100">
                  <span className="text-5xl mb-3">{item.icon}</span>
                  <p className="text-xl font-bold text-gray-800">{item.label}</p>
                  <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                  <div className={`w-8 h-1 rounded-full mt-2 bg-gradient-to-r ${item.color} transition-all duration-300 ${activeSection === item.id ? 'w-16' : 'w-8'}`}></div>
                </div>
              </button>
            ))}
          </div>

          {/* Área de contenido */}
          <div className={`bg-white/95 rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ${activeSection ? 'p-8' : 'p-0'}`}>
            {activeSection === "nuevas" && <SolicitudesNuevasAdmin />}
            {activeSection === "En_curso" && <SolicitudesEnCurso />}
            {activeSection === "cerradas" && <SolicitudesCerradas />}
            
            {!activeSection && (
              <div className="text-center py-20">
                <div className="inline-block p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Prueba Panel de Administración</h2>
                <p className="text-gray-600 max-w-md mx-auto">Selecciona una categoría para gestionar las solicitudes del sistema</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;