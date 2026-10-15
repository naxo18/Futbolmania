import { useState } from "react";
import { useUsuarios } from "../../hooks/useUsuarios";
import { eliminarUsuario } from "../../services/db";
import Buscador from "../../components/Buscador";
import Mensaje from "../../components/Mensaje";

function AdminUsuarios() {
  const usuarios = useUsuarios();
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");

  const filtrados = usuarios.filter((usuario) =>
    `${usuario.nombre} ${usuario.apellidos} ${usuario.correo} ${usuario.run}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  function manejarEliminar(usuario) {
    const confirmar = window.confirm(
      `¿Eliminar al usuario ${usuario.nombre} ${usuario.apellidos}?`
    );
    if (confirmar) {
      eliminarUsuario(usuario.run);
      setMensaje(`Usuario "${usuario.nombre}" eliminado.`);
    }
  }

  return (
    <div>
      <h2 className="h3 mb-3">Usuarios</h2>

      <Mensaje tipo="success">{mensaje}</Mensaje>

      <Buscador
        valor={busqueda}
        onCambiar={setBusqueda}
        placeholder="Buscar por nombre, correo o RUN..."
      />

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>RUN</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((usuario) => (
              <tr key={usuario.run}>
                <td>{usuario.run}</td>
                <td>
                  {usuario.nombre} {usuario.apellidos}
                </td>
                <td>{usuario.correo}</td>
                <td>{usuario.tipo}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => manejarEliminar(usuario)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtrados.length === 0 && (
        <p className="text-muted text-center">No se encontraron usuarios.</p>
      )}
    </div>
  );
}

export default AdminUsuarios;
