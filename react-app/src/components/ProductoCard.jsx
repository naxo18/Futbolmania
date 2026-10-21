import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/validaciones";

function ProductoCard({ producto, onAgregar }) {
  const precioActual = producto.oferta && producto.precioOferta > 0
    ? producto.precioOferta
    : producto.precio;
  const tieneDescuento = producto.oferta && producto.precioOferta > 0 && producto.precioOferta < producto.precio;

  return (
    <div className="card producto-card h-100 shadow-sm position-relative">
      {tieneDescuento && (
        <span className="badge bg-danger position-absolute top-0 start-0 m-2">
          Oferta
        </span>
      )}
      <img
        src={producto.imagen || "/img/camiseta.jpg"}
        className="card-img-top producto-img"
        alt={producto.nombre}
      />
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{producto.nombre}</h3>
        <div className="d-flex align-items-center gap-2 mb-1">
          <p className="fw-bold fs-5 mb-0">{formatearPrecio(precioActual)}</p>
          {tieneDescuento && (
            <small className="text-muted text-decoration-line-through">
              {formatearPrecio(producto.precio)}
            </small>
          )}
        </div>
        <span className="badge bg-secondary align-self-start mb-3">
          {producto.categoria}
        </span>

        <div className="mt-auto d-flex flex-column gap-2">
          <button
            className="btn btn-dark"
            onClick={() => onAgregar({ ...producto, precio: precioActual })}
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
