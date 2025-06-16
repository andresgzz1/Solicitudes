import { useState } from "react";
import SolicitudNuevaUsuario from "../components/usuario/SolicitudNuevaUsuario";
import EstadoSolicitudesUsuario from "../components/usuario/EstadoSolicitudesUsuario";
import HistorialSolicitudes from "../components/usuario/HistorialSolicitudes";

function ClientePanel({ usuario, onLogout }) {
  const [activeSection, setActiveSection] = useState("");
  const [isHovering, setIsHovering] = useState(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo optimizado */}
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
        {/* Navbar */}
        <nav className="bg-slate-900/80 backdrop-blur-md shadow-xl p-4 flex justify-between items-center sticky top-0 z-10">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="h-10 w-auto" 
          />
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner">
                <span className="text-purple-600 font-bold text-lg">{usuario.nombre.charAt(0)}</span>
              </div>
              <h1 className="text-xl font-bold text-white">
                Hola, <span className="font-light">{usuario.nombre}</span>
              </h1>
            </div>
            <button
              onClick={onLogout}
              className="bg-white text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2"
            >
              <span>Salir</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Contenido */}
        <div className="p-6 max-w-6xl mx-auto">
          {/* Tarjetas */}
          <div className="grid gap-8 md:grid-cols-3 mb-10">
            {[
              { id: "nueva", icon: "✨", label: "Nueva Solicitud", color: "from-blue-500 to-cyan-500" },
              { id: "estado", icon: "📈", label: "Estado", color: "from-amber-500 to-orange-500" },
              { id: "historial", icon: "📚", label: "Historial", color: "from-purple-500 to-pink-500" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                onMouseEnter={() => setIsHovering(item.id)}
                onMouseLeave={() => setIsHovering(null)}
                className={`bg-gradient-to-br ${item.color} rounded-2xl p-1 shadow-lg transition-all duration-500 ${isHovering === item.id ? 'transform -translate-y-2 shadow-xl' : ''}`}
              >
                <div className="bg-white/95 rounded-xl p-6 h-full flex flex-col items-center justify-center transition-all duration-300 hover:bg-opacity-100">
                  <span className="text-5xl mb-4">{item.icon}</span>
                  <p className="text-lg font-bold text-gray-800">{item.label}</p>
                  <div className={`w-8 h-1 rounded-full mt-3 bg-gradient-to-r ${item.color} transition-all duration-300 ${activeSection === item.id ? 'w-16' : 'w-8'}`}></div>
                </div>
              </button>
            ))}
          </div>

          {/* Área de contenido */}
          <div className={`bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ${activeSection ? 'p-8' : 'p-0'}`}>
            {activeSection === "nueva" && <SolicitudNuevaUsuario usuario={usuario} />}
            {activeSection === "estado" && <EstadoSolicitudesUsuario usuario={usuario} />}
            {activeSection === "historial" && <HistorialSolicitudes />}
            
            {!activeSection && (
              <div className="text-center py-20">
                <div className="inline-block p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Panel de Usuario</h2>
                <p className="text-gray-600 max-w-md mx-auto">Selecciona una opción del menú para comenzar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientePanel;