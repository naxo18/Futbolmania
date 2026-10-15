import { Link } from "react-router-dom";
import { useProductos } from "../../hooks/useProductos";
import { useUsuarios } from "../../hooks/useUsuarios";

function AdminDashboard() {
  const productos = useProductos();
  const usuarios = useUsuarios();

  const stockBajo = productos.filter((p) => p.stock <= p.stockCritico);

  return (
    <div>
      <h1 className="h3 mb-3">Panel de administración</h1>
      <p className="text-muted">
        Bienvenido al sistema administrativo de Futbolmania.
      </p>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h2 className="display-6">{productos.length}</h2>
            <p className="text-muted mb-1">Productos</p>
            <Link to="/admin/productos">Ver productos</Link>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h2 className="display-6">{usuarios.length}</h2>
            <p className="text-muted mb-1">Usuarios</p>
            <Link to="/admin/usuarios">Ver usuarios</Link>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h2 className="display-6 text-danger">{stockBajo.length}</h2>
            <p className="text-muted mb-1">Productos con stock crítico</p>
            <Link to="/admin/productos">Revisar</Link>
          </div>
        </div>
      </div>

      {stockBajo.length > 0 && (
        <div className="alert alert-warning">
          <strong>Alerta de stock:</strong>
          <ul className="mb-0">
            {stockBajo.map((producto) => (
              <li key={producto.id}>
                {producto.nombre} — stock {producto.stock} (crítico{" "}
                {producto.stockCritico})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
