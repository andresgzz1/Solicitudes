import { useEffect, useState } from "react";
import axios from "axios";
import DetalleSolicitud from "../DetalleSolicitud";

function EstadoSolicitudesUsuario({ usuario }) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [detalle, setDetalle] = useState(null);

  const verDetalle = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/solicitudes/${id}`);
    setDetalle(res.data);
  };

  useEffect(() => {
    const cargarSolicitudes = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/solicitudes/usuario/${usuario.id}`);
      const activas = res.data.filter((s) => s.estado !== "CERRADA"); 
      setSolicitudes(activas);
    };
    cargarSolicitudes();
  }, [usuario.id]);

  if (detalle) {
    return <DetalleSolicitud solicitud={detalle} onCerrar={() => setDetalle(null)} />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Estado de tus Solicitudes</h2>
      {solicitudes.length === 0 ? (
        <p>No tienes solicitudes activas en este momento.</p>
      ) : (
        <table className="w-full border bg-white rounded shadow">
          <thead>
            <tr className="bg-yellow-100 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Insumo</th>
              <th className="p-2">Equipo</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.id}</td>
                <td className="p-2">{s.insumo}</td>
                <td className="p-2">{s.equipo_estandar}</td>
                <td className="p-2 font-semibold text-blue-700">{s.estado}</td>
                <td className="p-2">
                  <button
                    onClick={() => verDetalle(s.id)}
                    className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 text-sm"
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EstadoSolicitudesUsuario;
