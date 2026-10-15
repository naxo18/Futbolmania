import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { formatearPrecio } from "../utils/validaciones";
import Mensaje from "../components/Mensaje";

function Carrito() {
  const {
    items,
    eliminar,
    cambiarCantidad,
    vaciar,
    total
  } = useCarrito();

  const [direccion, setDireccion] = useState("");
  const [errorDireccion, setErrorDireccion] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  function abrirResumen() {
    if (items.length === 0) {
      setMensaje({ tipo: "warning", texto: "Tu carrito está vacío." });
      return;
    }
    if (direccion.trim() === "") {
      setErrorDireccion("Debes ingresar una dirección de entrega.");
      return;
    }
    setErrorDireccion("");
    setMensaje({ tipo: "", texto: "" });
    setMostrarModal(true);
  }

  function confirmarPago() {
    setMensaje({
      tipo: "success",
      texto: `Pago realizado correctamente. Tu pedido será enviado a: ${direccion}`
    });
    vaciar();
    setDireccion("");
    setMostrarModal(false);
  }

  return (
    <main className="container py-5">
      <h2 className="text-center mb-4">Mi carrito</h2>

      <Mensaje tipo={mensaje.tipo}>{mensaje.texto}</Mensaje>

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

          <div className="mb-3">
            <label className="form-label fw-bold" htmlFor="direccion-entrega">
              Dirección de entrega
            </label>
            <textarea
              id="direccion-entrega"
              className="form-control"
              maxLength="300"
              value={direccion}
              placeholder="Ingresa la dirección para el despacho a domicilio"
              onChange={(evento) => setDireccion(evento.target.value)}
            ></textarea>
            <small className="text-danger">{errorDireccion}</small>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-danger" onClick={vaciar}>
              Vaciar carrito
            </button>
            <button className="btn btn-success" onClick={abrirResumen}>
              Pagar
            </button>
          </div>
        </>
      )}

      {mostrarModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Resumen de compra</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMostrarModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <ul className="list-group mb-3">
                  {items.map((item) => (
                    <li
                      className="list-group-item d-flex justify-content-between"
                      key={item.id}
                    >
                      <span>
                        {item.nombre} x {item.cantidad}
                      </span>
                      <span>
                        {formatearPrecio(item.precio * item.cantidad)}
                      </span>
                    </li>
                  ))}
                </ul>
                <h5 className="text-end">Total: {formatearPrecio(total)}</h5>
                <p className="mb-0">Dirección de entrega: {direccion}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setMostrarModal(false)}
                >
                  Cerrar
                </button>
                <button className="btn btn-success" onClick={confirmarPago}>
                  Confirmar pago
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Carrito;
