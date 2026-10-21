import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { formatearPrecio } from "../utils/validaciones";
import Mensaje from "../components/Mensaje";
import { crearPedido } from "../services/pedidos";

function Checkout() {
  const navigate = useNavigate();
  const { items, total, vaciar } = useCarrito();
  const { usuario } = useAuth();

  const [direccion, setDireccion] = useState(usuario?.direccion || "");
  const [tipoEntrega, setTipoEntrega] = useState("despacho_a_domicilio");
  const [telefono, setTelefono] = useState(usuario?.telefono || "");
  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(false);

  if (items.length === 0) {
    return (
      <main className="container py-5">
        <h2 className="text-center mb-4">Checkout</h2>
        <div className="text-center">
          <p className="text-muted">No hay productos en el carrito.</p>
          <button className="btn btn-dark" onClick={() => navigate("/productos")}>
            Ir a productos
          </button>
        </div>
      </main>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!direccion.trim()) {
      setError("Debes ingresar una dirección de envío.");
      return;
    }

    if (tipoEntrega === "despacho_a_domicilio" && !direccion.trim()) {
      setError("Debes ingresar una dirección para el despacho a domicilio.");
      return;
    }

    setProcesando(true);

    try {
      const pedido = crearPedido({
        usuario: usuario
          ? { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo }
          : null,
        items: items.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
          imagen: item.imagen
        })),
        total,
        direccion: direccion.trim(),
        tipoEntrega,
        telefono: telefono.trim(),
        cliente: usuario?.nombre || "Cliente"
      });

      vaciar();

      navigate("/compra-resultado", {
        state: {
          estado: "exitosa",
          pedido
        },
        replace: true
      });
    } catch (err) {
      navigate("/compra-resultado", {
        state: {
          estado: "fallida",
          mensaje: "No se pudo procesar la compra. Intenta nuevamente."
        },
        replace: true
      });
    }
  }

  return (
    <main className="container py-5">
      <h2 className="text-center mb-4">Finalizar compra</h2>
      <div className="row g-4">
        <div className="col-lg-7">
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <h4 className="mb-3">Datos de envío</h4>

            <div className="mb-3">
              <label className="form-label fw-bold" htmlFor="tipoEntrega">
                Opción de entrega
              </label>
              <select
                id="tipoEntrega"
                className="form-select"
                value={tipoEntrega}
                onChange={(e) => setTipoEntrega(e.target.value)}
              >
                <option value="despacho_a_domicilio">Despacho a domicilio</option>
                <option value="retiro_en_tienda">Retiro en tienda</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" htmlFor="direccion">
                Dirección de envío
              </label>
              <textarea
                id="direccion"
                className="form-control"
                maxLength="300"
                value={direccion}
                placeholder={
                  tipoEntrega === "retiro_en_tienda"
                    ? "Indica quién retirará el pedido (opcional si ya es el cliente)"
                    : "Ingresa la dirección completa para el despacho a domicilio"
                }
                onChange={(e) => setDireccion(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" htmlFor="telefono">
                Teléfono de contacto
              </label>
              <input
                id="telefono"
                type="tel"
                className="form-control"
                maxLength="15"
                value={telefono}
                placeholder="Ej: +56 9 1234 5678"
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            {error && <Mensaje tipo="warning">{error}</Mensaje>}

            <div className="d-flex gap-2 mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/carrito")}
                disabled={procesando}
              >
                Volver al carrito
              </button>
              <button type="submit" className="btn btn-success" disabled={procesando}>
                {procesando ? "Procesando..." : "Confirmar compra"}
              </button>
            </div>
          </form>
        </div>

        <div className="col-lg-5">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Resumen de compra</h4>
            <ul className="list-group mb-3">
              {items.map((item) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={item.id}
                >
                  <div>
                    <div className="fw-semibold">{item.nombre}</div>
                    <small className="text-muted">
                      {formatearPrecio(item.precio)} x {item.cantidad}
                    </small>
                  </div>
                  <span className="fw-bold">
                    {formatearPrecio(item.precio * item.cantidad)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>{formatearPrecio(total)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Envío</span>
              <span>{tipoEntrega === "retiro_en_tienda" ? "Gratis" : "Por calcular"}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span>{formatearPrecio(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
