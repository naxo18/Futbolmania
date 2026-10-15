import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { correoValido, runValido, validarPassword } from "../utils/validaciones";
import { listaRegiones, obtenerComunas } from "../data/regiones";
import { tiposUsuario } from "../data/usuarios";
import Campo from "../components/Campo";
import Mensaje from "../components/Mensaje";

const estadoInicial = {
  run: "",
  nombre: "",
  apellidos: "",
  correo: "",
  password: "",
  fecha: "",
  tipoUsuario: "",
  region: "",
  comuna: "",
  direccion: ""
};

function Registro() {
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const [datos, setDatos] = useState(estadoInicial);
  const [errores, setErrores] = useState({});
  const [aviso, setAviso] = useState("");

  function actualizar(campo, valor) {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }));
  }

  function validar() {
    const nuevos = {};

    if (!runValido(datos.run)) {
      nuevos.run =
        "El RUN es obligatorio, entre 7 y 9 caracteres, sin puntos ni guion.";
    }

    if (datos.nombre.trim() === "") {
      nuevos.nombre = "El nombre es obligatorio.";
    } else if (datos.nombre.length > 50) {
      nuevos.nombre = "El nombre no puede superar los 50 caracteres.";
    }

    if (datos.apellidos.trim() === "") {
      nuevos.apellidos = "Los apellidos son obligatorios.";
    }

    if (datos.correo.trim() === "") {
      nuevos.correo = "El correo es obligatorio.";
    } else if (datos.correo.length > 100) {
      nuevos.correo = "El correo no puede superar los 100 caracteres.";
    } else if (!correoValido(datos.correo)) {
      nuevos.correo = "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }

    if (datos.password.trim() === "") {
      nuevos.password = "La contraseña es obligatoria.";
    } else if (!validarPassword(datos.password)) {
      nuevos.password = "La contraseña debe tener entre 4 y 10 caracteres.";
    }

    if (datos.tipoUsuario === "") {
      nuevos.tipoUsuario = "Debes seleccionar un tipo de usuario.";
    }

    if (datos.region === "") {
      nuevos.region = "Debes seleccionar una región.";
    }

    if (datos.comuna === "") {
      nuevos.comuna = "Debes seleccionar una comuna.";
    }

    if (datos.direccion.trim() === "") {
      nuevos.direccion = "La dirección es obligatoria.";
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

    const resultado = registrar({
      ...datos,
      tipo: datos.tipoUsuario
    });

    if (!resultado.ok) {
      setErrores({ correo: resultado.mensaje });
      return;
    }

    setAviso("Registro realizado correctamente. Redirigiendo al login...");
    setTimeout(() => navigate("/login"), 1200);
  }

  const comunas = datos.region ? obtenerComunas(datos.region) : [];

  return (
    <main className="container py-5">
      <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: "700px" }}>
        <h1 className="text-center h3">Crear cuenta</h1>
        <p className="text-center text-muted">Regístrate en Futbolmania</p>

        <Mensaje tipo="success">{aviso}</Mensaje>

        <form onSubmit={manejarSubmit} noValidate>
          <div className="row">
            <div className="col-md-6">
              <Campo
                label="RUN"
                id="run"
                value={datos.run}
                error={errores.run}
                placeholder="Ej: 19011022K"
                autoComplete="off"
                onChange={(e) => actualizar("run", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <Campo
                label="Fecha de nacimiento"
                id="fecha"
                tipo="date"
                value={datos.fecha}
                onChange={(e) => actualizar("fecha", e.target.value)}
              />
            </div>
          </div>

          <Campo
            label="Nombre"
            id="nombre"
            maxLength="50"
            value={datos.nombre}
            error={errores.nombre}
            onChange={(e) => actualizar("nombre", e.target.value)}
          />

          <Campo
            label="Apellidos"
            id="apellidos"
            maxLength="100"
            value={datos.apellidos}
            error={errores.apellidos}
            onChange={(e) => actualizar("apellidos", e.target.value)}
          />

          <Campo
            label="Correo electrónico"
            id="correo"
            tipo="email"
            maxLength="100"
            placeholder="ejemplo@gmail.com"
            value={datos.correo}
            error={errores.correo}
            onChange={(e) => actualizar("correo", e.target.value)}
          />

          <Campo
            label="Contraseña"
            id="password"
            tipo="password"
            maxLength="10"
            value={datos.password}
            error={errores.password}
            onChange={(e) => actualizar("password", e.target.value)}
          />

          <Campo
            label="Tipo de usuario"
            id="tipoUsuario"
            as="select"
            value={datos.tipoUsuario}
            error={errores.tipoUsuario}
            opciones={[
              { value: "", label: "Seleccionar" },
              ...tiposUsuario.map((tipo) => ({ value: tipo, label: tipo }))
            ]}
            onChange={(e) => actualizar("tipoUsuario", e.target.value)}
          />

          <Campo
            label="Región"
            id="region"
            as="select"
            value={datos.region}
            error={errores.region}
            opciones={[
              { value: "", label: "Seleccionar región" },
              ...listaRegiones.map((region) => ({
                value: region,
                label: region
              }))
            ]}
            onChange={(e) => {
              actualizar("region", e.target.value);
              actualizar("comuna", "");
            }}
          />

          <Campo
            label="Comuna"
            id="comuna"
            as="select"
            value={datos.comuna}
            error={errores.comuna}
            disabled={!datos.region}
            opciones={[
              { value: "", label: "Seleccionar comuna" },
              ...comunas.map((comuna) => ({ value: comuna, label: comuna }))
            ]}
            onChange={(e) => actualizar("comuna", e.target.value)}
          />

          <Campo
            label="Dirección"
            id="direccion"
            as="textarea"
            maxLength="300"
            placeholder="Ingresa tu dirección"
            value={datos.direccion}
            error={errores.direccion}
            onChange={(e) => actualizar("direccion", e.target.value)}
          />

          <button type="submit" className="btn btn-success w-100">
            Crear cuenta
          </button>
        </form>
      </div>
    </main>
  );
}

export default Registro;
