import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminLayout() {
  const { cerrarSesion, usuario } = useAuth();

  const claseEnlace = ({ isActive }) =>
    "list-group-item list-group-item-action" + (isActive ? " active" : "");

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <aside className="col-12 col-lg-3">
          <div className="admin-menu p-3 rounded h-100">
            <h2 className="h4 text-success">Futbolmania</h2>
            <h3 className="h6 text-light">Administrador</h3>
            <p className="text-secondary small mb-3">{usuario?.nombre}</p>

            <div className="list-group">
              <NavLink className={claseEnlace} to="/admin" end>
                Inicio
              </NavLink>
              <NavLink className={claseEnlace} to="/admin/productos">
                Productos
              </NavLink>
              <NavLink className={claseEnlace} to="/admin/productos/nuevo">
                Nuevo producto
              </NavLink>
              <NavLink className={claseEnlace} to="/admin/usuarios">
                Usuarios
              </NavLink>
              <button
                className="list-group-item list-group-item-action text-danger"
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </aside>

        <main className="col-12 col-lg-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
