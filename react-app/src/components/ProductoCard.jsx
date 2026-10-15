import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/validaciones";

function ProductoCard({ producto, onAgregar }) {
  return (
    <div className="card producto-card h-100 shadow-sm">
      <img
        src={producto.imagen || "/img/camiseta.jpg"}
        className="card-img-top producto-img"
        alt={producto.nombre}
      />
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{producto.nombre}</h3>
        <p className="fw-bold fs-5">{formatearPrecio(producto.precio)}</p>
        <span className="badge bg-secondary align-self-start mb-3">
          {producto.categoria}
        </span>

        <div className="mt-auto d-flex flex-column gap-2">
          <button
            className="btn btn-dark"
            onClick={() => onAgregar(producto)}
          >
            Añadir al carrito
          </button>
          <Link className="btn btn-outline-success" to={`/productos/${producto.id}`}>
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductoCard;
