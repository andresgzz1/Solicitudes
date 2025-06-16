import axios from "axios";

function FormularioAdminSolicitud({ solicitud, onAceptar, onVolver, setMensaje }) {
  const rechazarSolicitud = async () => {
    const confirmar = window.confirm("¿Estás seguro de que deseas rechazar esta solicitud?");
    if (confirmar) {
      await axios.put(`http://127.0.0.1:5000/solicitudes/${solicitud.id}/rechazar`);
      setMensaje("Solicitud rechazada correctamente.");
      onVolver(); // Regresa a la tabla
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="text-lg font-semibold">Detalle de Solicitud #{solicitud.id}</h3>
      <p><strong>Insumo:</strong> {solicitud.insumo}</p>
      <p><strong>Equipo Estándar:</strong> {solicitud.equipo_estandar}</p>
      <p><strong>Justificación:</strong> {solicitud.justificacion}</p>
      <p><strong>Jefatura:</strong> {solicitud.jefatura}</p>
      <p><strong>Observación:</strong> {solicitud.observacion || "N/A"}</p>
      <p><strong>Fecha:</strong> {solicitud.fecha_creacion}</p>

      <div className="mt-4 flex gap-4">
        <button
          onClick={onAceptar}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Aceptar Solicitud
        </button>

        <button
          onClick={rechazarSolicitud}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Rechazar
        </button>

        <button
          onClick={onVolver}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Volver
        </button>
      </div>
    </div>
  );
}

export default FormularioAdminSolicitud;
