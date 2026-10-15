import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../../hooks/useProductos";
import { eliminarProducto } from "../../services/db";
import { formatearPrecio } from "../../utils/validaciones";
import Mensaje from "../../components/Mensaje";

function AdminProductos() {
  const productos = useProductos();
  const [mensaje, setMensaje] = useState("");

  function manejarEliminar(producto) {
    const confirmar = window.confirm(
      `¿Está seguro de eliminar "${producto.nombre}"?`
    );
    if (confirmar) {
      eliminarProducto(producto.id);
      setMensaje(`Producto "${producto.nombre}" eliminado correctamente.`);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h3 mb-0">Administración de productos</h2>
        <Link className="btn btn-success" to="/admin/productos/nuevo">
          Nuevo producto
        </Link>
      </div>

      <Mensaje tipo="success">{mensaje}</Mensaje>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{formatearPrecio(producto.precio)}</td>
                <td>
                  {producto.stock <= producto.stockCritico ? (
                    <span className="badge bg-danger">
                      {producto.stock}
                    </span>
                  ) : (
                    producto.stock
                  )}
                </td>
                <td>{producto.categoria}</td>
                <td>
                  <Link
                    className="btn btn-sm btn-outline-primary me-2"
                    to={`/admin/productos/editar/${producto.id}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => manejarEliminar(producto)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {productos.length === 0 && (
        <p className="text-muted text-center">No hay productos registrados.</p>
      )}
    </div>
  );
}

export default AdminProductos;
