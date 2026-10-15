import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { useCarrito } from "../context/CarritoContext";
import { formatearPrecio } from "../utils/validaciones";
import Mensaje from "../components/Mensaje";

function DetalleProducto() {
  const { id } = useParams();
  const productos = useProductos();
  const { agregar } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <main className="container py-5 text-center">
        <h2>Producto no encontrado</h2>
        <Link className="btn btn-dark mt-3" to="/productos">
          Volver a productos
        </Link>
      </main>
    );
  }

  function agregarAlCarrito() {
    agregar(producto);
    setAgregado(true);
  }

  return (
    <main className="container py-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "800px" }}>
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={producto.imagen || "/img/camiseta.jpg"}
              className="img-fluid rounded-start w-100 h-100"
              style={{ objectFit: "cover" }}
              alt={producto.nombre}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <span className="badge bg-secondary mb-2">
                {producto.categoria}
              </span>
              <h2>{producto.nombre}</h2>
              <p className="text-muted">
                {producto.descripcion ||
                  "Producto deportivo ideal para los fanáticos del fútbol."}
              </p>
              <p className="fw-bold fs-3">
                {formatearPrecio(producto.precio)}
              </p>
              <p className="text-muted">Stock disponible: {producto.stock}</p>

              <Mensaje tipo="success">
                {agregado ? "Producto agregado al carrito." : ""}
              </Mensaje>

              <button className="btn btn-dark" onClick={agregarAlCarrito}>
                Añadir al carrito
              </button>
              <Link className="btn btn-outline-secondary ms-2" to="/productos">
                Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;
