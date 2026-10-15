function CategoriaFiltro({ categorias, categoriaActiva, onCambiar }) {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          className={
            "btn rounded-pill " +
            (categoriaActiva === categoria
              ? "btn-dark"
              : "btn-outline-dark")
          }
          onClick={() => onCambiar(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}

export default CategoriaFiltro;
