import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { formatearPrecio } from "../utils/validaciones";
import Mensaje from "../components/Mensaje";

function Carrito() {
  const navigate = useNavigate();
  const {
    items,
    eliminar,
    cambiarCantidad,
    vaciar,
    total
  } = useCarrito();

  return (
    <main className="container py-5">
      <h2 className="text-center mb-4">Mi carrito</h2>

      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-muted">No hay productos en el carrito.</p>
          <Link className="btn btn-dark" to="/productos">
            Ir a productos
          </Link>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {items.map((item) => (
              <div className="col-12" key={item.id}>
                <div className="card">
                  <div className="row g-0 align-items-center">
                    <div className="col-4 col-md-2">
                      <img
                        src={item.imagen || "/img/camiseta.jpg"}
                        className="img-fluid rounded-start"
                        style={{ height: "120px", width: "100%", objectFit: "cover" }}
                        alt={item.nombre}
                      />
                    </div>
                    <div className="col-8 col-md-6 p-3">
                      <h3 className="h5 mb-1">{item.nombre}</h3>
                      <p className="mb-0 text-muted">
                        {formatearPrecio(item.precio)} c/u
                      </p>
                    </div>
                    <div className="col-6 col-md-2 p-3">
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        value={item.cantidad}
                        aria-label={`Cantidad de ${item.nombre}`}
                        onChange={(evento) =>
                          cambiarCantidad(item.id, evento.target.value)
                        }
                      />
                    </div>
                    <div className="col-6 col-md-2 p-3 text-end">
                      <p className="fw-bold mb-2">
                        {formatearPrecio(item.precio * item.cantidad)}
                      </p>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminar(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-end mt-4">Total: {formatearPrecio(total)}</h3>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-danger" onClick={vaciar}>
              Vaciar carrito
            </button>
            <button className="btn btn-success" onClick={() => navigate("/checkout")}>
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Carrito;
