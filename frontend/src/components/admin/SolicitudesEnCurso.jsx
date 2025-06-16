import { useEffect, useState } from "react";
import axios from "axios";
import DetalleSolicitud from "../DetalleSolicitud";

function SolicitudesEnCurso() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const cargarSolicitudes = async () => {
    const res = await axios.get("http://127.0.0.1:5000/solicitudes/En_curso");
    setSolicitudes(res.data);
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    await axios.put(`http://127.0.0.1:5000/solicitudes/${id}/estado`, {
      estado: nuevoEstado,
    });
    setMensaje(`Solicitud #${id} actualizada a ${nuevoEstado}`);
    cargarSolicitudes();
  };

  const cerrarSolicitud = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de cerrar esta solicitud?");
    if (!confirmar) return;

    await axios.put(`http://127.0.0.1:5000/solicitudes/${id}/cerrar`);
    setMensaje(`Solicitud #${id} ha sido cerrada`);
    cargarSolicitudes();
  };

  const verDetalle = async (id) => {
    const res = await axios.get(`http://127.0.0.1:5000/solicitudes/${id}`);
    setDetalle(res.data);
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  if (detalle) {
    return <DetalleSolicitud solicitud={detalle} onCerrar={() => setDetalle(null)} />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Solicitudes en Curso</h2>
      {mensaje && <p className="text-green-600 mb-4">{mensaje}</p>}
      <table className="w-full border bg-white rounded shadow">
        <thead>
          <tr className="bg-yellow-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Usuario</th>
            <th className="p-2">Insumo</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.id}</td>
              <td className="p-2">{s.nombre_usuario}</td>
              <td className="p-2">{s.insumo}</td>
              <td className="p-2 font-semibold text-blue-700">{s.estado}</td>
              <td className="p-2 space-y-1">
                <div className="mb-2">
                  {["PENDIENTE", "PROCESO VALIDACION", "PROCESO GESTION", "ENVIO/ENTREGA"].map((estado) => (
                    <button
                      key={estado}
                      className={`text-xs px-2 py-1 rounded mr-1
                        ${s.estado === estado
                          ? "bg-blue-700 text-white"
                          : "bg-gray-200 hover:bg-gray-300"}
                      `}
                      onClick={() => actualizarEstado(s.id, estado)}
                    >
                      {estado}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 p">
                  <button
                    className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 text-sm"
                    onClick={() => verDetalle(s.id)}
                  >
                    Ver detalles
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                    onClick={() => cerrarSolicitud(s.id)}
                  >
                    Cerrar solicitud
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SolicitudesEnCurso;
