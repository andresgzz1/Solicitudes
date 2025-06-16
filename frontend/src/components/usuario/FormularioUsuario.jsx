function FormularioUsuario({ values, onChange, onSubmit, mensaje }) {
  const insumosDisponibles = {
    "Computador": ["Laptop", "PC de Escritorio"],
    "Pantalla": ["Monitor 24", "Monitor 27"],
    "Accesorios": ["Mouse", "Teclado", "Audífonos"],
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Nueva Solicitud</h2>
      {mensaje && <p className="text-green-700">{mensaje}</p>}

      <select
        name="insumo"
        value={values.insumo}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Selecciona un insumo</option>
        {Object.keys(insumosDisponibles).map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      {values.insumo && (
        <select
          name="equipo_estandar"
          value={values.equipo_estandar}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecciona un equipo</option>
          {insumosDisponibles[values.insumo].map((eq) => (
            <option key={eq}>{eq}</option>
          ))}
        </select>
      )}

      <textarea
        name="justificacion"
        placeholder="Justificación"
        value={values.justificacion}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        name="jefatura"
        type="text"
        placeholder="Jefatura o Gerencia"
        value={values.jefatura}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="observacion"
        placeholder="Observación adicional (opcional)"
        value={values.observacion}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />
      <p className=" text-s text-red-600 font-bold ">Aproximadamente existira un plazo de 15 dias para realizar todo el proceso de solicitud con la entrega</p>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Enviar Solicitud
      </button>
    </form>
  );
}

export default FormularioUsuario;
