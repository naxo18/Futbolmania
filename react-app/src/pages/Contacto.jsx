import { useState } from "react";
import { correoValido } from "../utils/validaciones";
import Campo from "../components/Campo";
import Mensaje from "../components/Mensaje";

function Contacto() {
  const [datos, setDatos] = useState({ nombre: "", correo: "", comentario: "" });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function actualizar(campo, valor) {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }));
  }

  function validar() {
    const nuevos = {};

    if (datos.nombre.trim() === "") {
      nuevos.nombre = "El nombre es obligatorio.";
    } else if (datos.nombre.length > 100) {
      nuevos.nombre = "Máximo 100 caracteres.";
    }

    if (!correoValido(datos.correo)) {
      nuevos.correo = "Correo no permitido.";
    } else if (datos.correo.length > 100) {
      nuevos.correo = "Máximo 100 caracteres.";
    }

    if (datos.comentario.trim() === "") {
      nuevos.comentario = "El comentario es obligatorio.";
    } else if (datos.comentario.length > 500) {
      nuevos.comentario = "Máximo 500 caracteres.";
    }

    return nuevos;
  }

  function manejarSubmit(evento) {
    evento.preventDefault();
    const nuevosErrores = validar();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    setEnviado(true);
    setDatos({ nombre: "", correo: "", comentario: "" });
  }

  return (
    <main className="container py-5">
      <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Contáctanos</h2>

        <Mensaje tipo="success">
          {enviado ? "Mensaje enviado correctamente." : ""}
        </Mensaje>

        <form onSubmit={manejarSubmit} noValidate>
          <Campo
            label="Nombre"
            id="contacto-nombre"
            value={datos.nombre}
            error={errores.nombre}
            onChange={(e) => actualizar("nombre", e.target.value)}
          />

          <Campo
            label="Correo"
            id="contacto-correo"
            tipo="email"
            value={datos.correo}
            error={errores.correo}
            onChange={(e) => actualizar("correo", e.target.value)}
          />

          <Campo
            label="Comentario"
            id="comentario"
            as="textarea"
            maxLength="500"
            value={datos.comentario}
            error={errores.comentario}
            onChange={(e) => actualizar("comentario", e.target.value)}
          />

          <button type="submit" className="btn btn-dark w-100">
            Enviar mensaje
          </button>
        </form>
      </div>
    </main>
  );
}

export default Contacto;
