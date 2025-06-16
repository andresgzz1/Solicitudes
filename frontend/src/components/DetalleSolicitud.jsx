function DetalleSolicitud({ solicitud, onCerrar }) {
  return (
    <div className="bg-white p-6 rounded shadow space-y-2">
      <h3 className="text-lg font-bold mb-2">Detalle de Solicitud #{solicitud.id}</h3>
      <p><strong>Insumo:</strong> {solicitud.insumo}</p>
      <p><strong>Equipo Estándar:</strong> {solicitud.equipo_estandar}</p>
      <p><strong>Justificación:</strong> {solicitud.justificacion}</p>
      <p><strong>Jefatura:</strong> {solicitud.jefatura}</p>
      <p><strong>Observación:</strong> {solicitud.observacion || "N/A"}</p>
      <p><strong>Estado:</strong> {solicitud.estado}</p>
      <p><strong>Fecha de creación:</strong> {solicitud.fecha_creacion}</p>
      <div className="mt-4">
        <button
          onClick={onCerrar}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cerrar Detalle
        </button>
      </div>
    </div>
  );
}

export default DetalleSolicitud;
