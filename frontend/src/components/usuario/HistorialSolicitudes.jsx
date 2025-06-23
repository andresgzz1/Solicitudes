import { useEffect, useState } from "react";
import axios from "axios";

function HistorialSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);

  const cargarHistorial = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/usuario/${usuario.id}/historial`);
    setSolicitudes(res.data);
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Historial de Solicitudes</h2>
      {solicitudes.length === 0 ? (
        <p>No tienes solicitudes cerradas aún.</p>
      ) : (
        <table className="w-full border bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Insumo</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.id}</td>
                <td className="p-2">{s.insumo}</td>
                <td className={`p-2 font-semibold ${s.estado === "rechazada" ? "text-red-600" : "text-green-700"}`}>
                  {s.estado === "rechazada" ? "Rechazada" : "Cerrada"}
                </td>
                <td className="p-2">{s.fecha_creacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistorialSolicitudes;
