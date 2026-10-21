import { useLocation, useNavigate } from "react-router-dom";
import { formatearPrecio } from "../utils/validaciones";

function CompraResultado() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  if (!state.estado) {
    return (
      <main className="container py-5 text-center">
        <h2 className="mb-3">Sin información de compra</h2>
        <p className="text-muted mb-4">
          No hay datos para mostrar. Vuelve al carrito o a la tienda.
        </p>
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-outline-secondary" onClick={() => navigate("/carrito")}>
            Ir al carrito
          </button>
          <button className="btn btn-dark" onClick={() => navigate("/productos")}>
            Ir a productos
          </button>
        </div>
      </main>
    );
  }

  const { estado, pedido, mensaje } = state;

  if (estado === "fallida") {
    return (
      <main className="container py-5 text-center">
        <div className="card mx-auto shadow-sm" style={{ maxWidth: "500px" }}>
          <div className="card-body p-4">
            <h2 className="text-danger mb-3">No se pudo realizar la compra</h2>
            <p className="mb-4">
              {mensaje || "Ocurrió un error al procesar tu pedido. Intenta nuevamente."}
            </p>
            <div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-outline-secondary" onClick={() => navigate("/carrito")}>
                Volver al carrito
              </button>
              <button className="btn btn-dark" onClick={() => navigate("/productos")}>
                Seguir comprando
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <div className="text-center mb-4">
        <h2 className="text-success mb-2">¡Compra realizada con éxito!</h2>
        <p className="text-muted">Gracias por tu compra en Futbolmania</p>
      </div>

      <div className="card mx-auto shadow-sm" style={{ maxWidth: "700px" }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between flex-wrap mb-3">
            <div>
              <strong>Número de pedido:</strong> {pedido?.numero}
            </div>
            <div>
              <strong>Fecha:</strong>{" "}
              {pedido?.fecha ? new Date(pedido.fecha).toLocaleString() : "-"}
            </div>
          </div>

          <hr />

          <h5 className="mb-3">Productos</h5>
          <ul className="list-group mb-3">
            {(pedido?.items || []).map((item, idx) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={idx}
              >
                <div>
                  <div className="fw-semibold">{item.nombre}</div>
                  <small className="text-muted">
                    Cantidad: {item.cantidad}
                  </small>
                </div>
                <span className="fw-bold">
                  {formatearPrecio(item.precio * item.cantidad)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mb-2">
            <strong>Tipo de entrega:</strong>{" "}
            {pedido?.tipoEntrega === "retiro_en_tienda"
              ? "Retiro en tienda"
              : "Despacho a domicilio"}
          </div>
          <div className="mb-2">
            <strong>Dirección:</strong> {pedido?.direccion || "-"}
          </div>
          {pedido?.telefono && (
            <div className="mb-2">
              <strong>Teléfono de contacto:</strong> {pedido.telefono}
            </div>
          )}

          <hr />

          <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
            <span>Total pagado</span>
            <span>{formatearPrecio(pedido?.total || 0)}</span>
          </div>

          <div className="d-flex gap-2 justify-content-center flex-wrap">
            <button className="btn btn-dark" onClick={() => navigate("/productos")}>
              Seguir comprando
            </button>
            <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CompraResultado;
