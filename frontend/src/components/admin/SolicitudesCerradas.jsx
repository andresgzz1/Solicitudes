import { useEffect, useState } from "react";
import axios from "axios";
import DetalleSolicitud from "../DetalleSolicitud";

function SolicitudesCerradas() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [detalle, setDetalle] = useState(null);

  const cargarSolicitudes = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/solicitudes/cerradas`);
    setSolicitudes(res.data);
  };

  const verDetalle = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/solicitudes/${id}`);
    setDetalle(res.data);
  };

  const descargarExcel = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/solicitudes/cerradas/exportar`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "solicitudes_cerradas.xlsx");
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  if (detalle) {
    return <DetalleSolicitud solicitud={detalle} onCerrar={() => setDetalle(null)} />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Solicitudes Cerradas</h2>

      <button
        onClick={descargarExcel}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Descargar solicitudes
      </button>

      <table className="w-full border bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Usuario</th>
            <th className="p-2">Insumo</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.id}</td>
              <td className="p-2">{s.nombre_usuario}</td>
              <td className="p-2">{s.insumo}</td>
              <td className={`p-2 font-semibold ${s.estado === "rechazada" ? "text-red-600" : "text-green-700"}`}>
                {s.estado === "rechazada" ? "Rechazada" : "Cerrada"}
              </td>
              <td className="p-2">{s.fecha_creacion}</td>
              <td className="p-2">
                <button
                  onClick={() => verDetalle(s.id)}
                  className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm"
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SolicitudesCerradas;
