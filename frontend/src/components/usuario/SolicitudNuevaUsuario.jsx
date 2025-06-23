import { useState } from "react";
import axios from "axios";
import FormularioUsuario from "./FormularioUsuario";

function SolicitudNuevaUsuario({ usuario }) {
  const [mensaje, setMensaje] = useState("");
  const [formulario, setFormulario] = useState({
    insumo: "",
    equipo_estandar: "",
    justificacion: "",
    jefatura: "",
    observacion: "",
  });

  const [imagenInsumo, setImagenInsumo] = useState("");
  const [mostrarImagen, setMostrarImagen] = useState(false);

  // Datos de insumos con la estructura solicitada
  const insumos = [
    { 
      nombre: "Computador", 
      equipos: [
        { nombre: "Laptop", imagen: "/insumos/computador.jpg" },
        { nombre: "PC de Escritorio", imagen: "/insumos/pc.jpg" }
      ] 
    },
    { 
      nombre: "Pantalla", 
      equipos: [
        { nombre: "Monitor 24", imagen: "/insumos/monitor-24.jpg" },
        { nombre: "Monitor 27", imagen: "/insumos/monitor-27.jpg" }
      ] 
    },
    { 
      nombre: "Accesorios", 
      equipos: [
        { nombre: "Mouse", imagen: "/insumos/mouse.jpg" },
        { nombre: "Teclado", imagen: "/insumos/teclado.jpg" },
        { nombre: "Audifonos", imagen: "/insumos/audifonos.jpg" }
      ] 
    }
  ];

  // Especificaciones técnicas actualizadas
  const especificaciones = {
    "Laptop": {
      "Modelo": "HP EliteBook 840 G9",
      "Procesador": "Intel Core i7-1260P",
      "RAM": "16GB DDR5",
      "Almacenamiento": "512GB NVMe SSD",
      "Pantalla": "14\" FHD IPS"
    },
    "PC de Escritorio": {
      "Modelo": "Dell OptiPlex 7000",
      "Procesador": "Intel Core i5-12500",
      "RAM": "16GB DDR4",
      "Almacenamiento": "512GB SSD + 1TB HDD",
      "Tarjeta Gráfica": "Intel UHD Graphics 770"
    },
    "Monitor 24": {
      "Modelo": "Dell P2422H",
      "Tipo": "LED IPS",
      "Resolución": "1920x1080 (Full HD)",
      "Tasa de refresco": "60Hz",
      "Conexiones": "HDMI, DisplayPort, VGA"
    },
    "Monitor 27": {
      "Modelo": "LG 27UL500-W",
      "Tipo": "LED IPS",
      "Resolución": "3840x2160 (4K UHD)",
      "Tasa de refresco": "60Hz",
      "Conexiones": "HDMI, DisplayPort"
    },
    "Mouse": {
      "Modelo": "Logitech MX Master 3",
      "Tipo": "Inalámbrico",
      "DPI": "4000",
      "Conectividad": "Bluetooth/Unifying",
      "Batería": "Carga USB (70 días)"
    },
    "Teclado": {
      "Modelo": "Keychron K2",
      "Tipo": "Mecánico",
      "Switch": "Gateron Brown",
      "Conectividad": "Bluetooth/Cable USB",
      "Iluminación": "RGB retroiluminado"
    },
    "Audifonos": {
      "Modelo": "Sony WH-1000XM4",
      "Tipo": "Over-ear inalámbricos",
      "Cancelación de ruido": "Sí",
      "Batería": "30 horas",
      "Conectividad": "Bluetooth 5.0"
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormulario((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "insumo") {
        updated.equipo_estandar = "";
        setMostrarImagen(false);
      } else if (name === "equipo_estandar" && value) {
        const insumoSeleccionado = insumos.find(i => i.nombre === formulario.insumo);
        const equipo = insumoSeleccionado?.equipos.find(e => e.nombre === value);
        setImagenInsumo(equipo?.imagen || "");
        setMostrarImagen(true);
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/solicitudes`, {
        ...formulario,
        usuario_id: usuario.id,
      });
      setMensaje("Solicitud enviada con éxito.");
      setFormulario({
        insumo: "",
        equipo_estandar: "",
        justificacion: "",
        jefatura: "",
        observacion: "",
      });
      setMostrarImagen(false);
    } catch {
      setMensaje("Error al enviar la solicitud.");
    }
  };

  const getEspecificaciones = () => {
    if (!formulario.equipo_estandar) return null;
    return especificaciones[formulario.equipo_estandar] || {};
  };

  const specs = getEspecificaciones();

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Formulario */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
          <FormularioUsuario
            values={formulario}
            onChange={handleChange}
            onSubmit={handleSubmit}
            mensaje={mensaje}
            insumos={insumos}
          />
        </div>

        {/* Panel de visualización */}
        <div className={`lg:w-96 transition-all duration-300 ${mostrarImagen ? "opacity-100" : "opacity-0 lg:opacity-100"}`}>
          <div className={`bg-white rounded-xl shadow-sm border border-gray-100 sticky top-6 transition-all ${mostrarImagen ? "block" : "hidden lg:block lg:invisible"}`}>
            
            {/* Imagen del equipo */}
            {mostrarImagen ? (
              <div className="p-4 border-b border-gray-100">
                <div className="aspect-w-16 aspect-h-9 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={imagenInsumo}
                    alt={formulario.equipo_estandar}
                    className="object-contain h-48 w-full"
                  />
                </div>
                <h3 className="text-center mt-3 text-lg font-semibold text-gray-800">
                  {formulario.insumo} - {formulario.equipo_estandar}
                </h3>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Seleccione un equipo para ver detalles</p>
              </div>
            )}

            {/* Especificaciones técnicas */}
            <div className="p-4">
              <h4 className="font-bold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                Especificaciones Técnicas
              </h4>
              
              {specs && Object.keys(specs).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-sm text-gray-500">{key}:</span>
                      <span className="text-sm font-medium text-gray-700 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400 text-sm">
                  {mostrarImagen ? "Especificaciones no disponibles" : "Seleccione un equipo para ver las especificaciones"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolicitudNuevaUsuario;
