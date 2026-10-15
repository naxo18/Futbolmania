function Campo({ label, id, error, tipo = "text", as, opciones, ...props }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold" htmlFor={id}>
        {label}
      </label>

      {as === "select" ? (
        <select className="form-select" id={id} name={id} {...props}>
          {opciones &&
            opciones.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
        </select>
      ) : as === "textarea" ? (
        <textarea className="form-control" id={id} name={id} {...props} />
      ) : (
        <input
          className="form-control"
          type={tipo}
          id={id}
          name={id}
          {...props}
        />
      )}

      <small className="text-danger d-block" style={{ minHeight: "18px" }}>
        {error}
      </small>
    </div>
  );
}

export default Campo;
