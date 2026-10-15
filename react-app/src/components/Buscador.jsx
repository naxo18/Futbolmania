function Buscador({ valor, onCambiar, placeholder }) {
  return (
    <div className="input-group mb-4">
      <span className="input-group-text">Buscar</span>
      <input
        type="text"
        className="form-control"
        value={valor}
        placeholder={placeholder || "Escribe para filtrar..."}
        onChange={(evento) => onCambiar(evento.target.value)}
      />
      {valor && (
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => onCambiar("")}
        >
          Limpiar
        </button>
      )}
    </div>
  );
}

export default Buscador;
