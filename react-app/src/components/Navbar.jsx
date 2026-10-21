import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const { cantidadTotal } = useCarrito();
  const { usuario, esAdministrador, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  function salir() {
    cerrarSesion();
    setAbierto(false);
    navigate("/");
  }

  const claseEnlace = ({ isActive }) =>
    "nav-link" + (isActive ? " active fw-bold text-success" : "");

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            FUTBOLMANIA
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={abierto}
            onClick={() => setAbierto(!abierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={"collapse navbar-collapse" + (abierto ? " show" : "")}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={claseEnlace} to="/" end onClick={() => setAbierto(false)}>
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={claseEnlace} to="/productos" onClick={() => setAbierto(false)}>
                  Productos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={claseEnlace} to="/ofertas" onClick={() => setAbierto(false)}>
                  Ofertas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={claseEnlace} to="/nosotros" onClick={() => setAbierto(false)}>
                  Nosotros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={claseEnlace} to="/blogs" onClick={() => setAbierto(false)}>
                  Blog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={claseEnlace} to="/contacto" onClick={() => setAbierto(false)}>
                  Contacto
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav align-items-lg-center">
              {usuario ? (
                <>
                  <li className="nav-item">
                    <span className="navbar-text text-light me-lg-3">
                      Hola, {usuario.nombre}
                    </span>
                  </li>
                  {esAdministrador && (
                    <li className="nav-item">
                      <NavLink className={claseEnlace} to="/admin" onClick={() => setAbierto(false)}>
                        Panel
                      </NavLink>
                    </li>
                  )}
                  <li className="nav-item">
                    <button className="btn btn-sm btn-outline-light" onClick={salir}>
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className={claseEnlace} to="/login" onClick={() => setAbierto(false)}>
                      Iniciar sesión
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={claseEnlace} to="/registro" onClick={() => setAbierto(false)}>
                      Registro
                    </NavLink>
                  </li>
                </>
              )}

              <li className="nav-item ms-lg-3">
                <NavLink
                  className="btn btn-success btn-sm position-relative"
                  to="/carrito"
                  onClick={() => setAbierto(false)}
                >
                  Carrito
                  {cantidadTotal > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cantidadTotal}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
