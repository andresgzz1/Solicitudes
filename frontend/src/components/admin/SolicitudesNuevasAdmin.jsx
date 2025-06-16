import { useEffect, useState } from "react";
import axios from "axios";
import FormularioAdminSolicitud from "./FormularioAdminSolicitud";

function SolicitudesNuevasAdmin() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const cargarSolicitudes = async () => {
    const res = await axios.get("http://127.0.0.1:5000/solicitudes/nuevas");
    setSolicitudes(res.data);
  };

  const verDetalle = async (id) => {
    const res = await axios.get(`http://127.0.0.1:5000/solicitudes/${id}`);
    setDetalle(res.data);
  };

  const aceptarSolicitud = async () => {
    await axios.put(`http://127.0.0.1:5000/solicitudes/${detalle.id}/aceptar`);
    setMensaje("Solicitud aceptada correctamente.");
    setDetalle(null);
    cargarSolicitudes();
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Solicitudes Nuevas</h2>
      {mensaje && <p className="text-green-600 mb-4">{mensaje}</p>}

      {!detalle ? (
        <table className="w-full border bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Usuario</th>
              <th className="p-2">Insumo</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.id}</td>
                <td className="p-2">{s.nombre_usuario}</td>
                <td className="p-2">{s.insumo}</td>
                <td className="p-2">{s.fecha_creacion}</td>
                <td className="p-2">
                  <button
                    onClick={() => verDetalle(s.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Ver solicitud
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <FormularioAdminSolicitud
        solicitud={detalle}
        onAceptar={aceptarSolicitud}
        onVolver={() => {
          setDetalle(null);
          cargarSolicitudes(); 
        }}
        setMensaje={setMensaje}
      />
      )}
    </div>
  );
}

export default SolicitudesNuevasAdmin;
