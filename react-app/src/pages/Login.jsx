import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { correoValido, validarPassword } from "../utils/validaciones";
import Campo from "../components/Campo";
import Mensaje from "../components/Mensaje";

function Login() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});

  function validar() {
    const nuevos = {};
    if (correo.trim() === "") {
      nuevos.correo = "El correo es obligatorio.";
    } else if (correo.length > 100) {
      nuevos.correo = "El correo no puede superar los 100 caracteres.";
    } else if (!correoValido(correo)) {
      nuevos.correo = "Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }

    if (password === "") {
      nuevos.password = "La contraseña es obligatoria.";
    } else if (!validarPassword(password)) {
      nuevos.password = "La contraseña debe tener entre 4 y 10 caracteres.";
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

    const resultado = iniciarSesion(correo.trim(), password);

    if (!resultado.ok) {
      setErrores({ password: resultado.mensaje });
      return;
    }

    const esAdmin = ["administrador", "vendedor"].includes(
      String(resultado.usuario.tipo).toLowerCase()
    );

    navigate(esAdmin ? "/admin" : "/");
  }

  return (
    <main className="container py-5">
      <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        <Mensaje tipo="info">
          Puedes probar con: ignacio@gmail.com / 1234
        </Mensaje>

        <form onSubmit={manejarSubmit} noValidate>
          <Campo
            label="Correo"
            id="correo"
            tipo="email"
            value={correo}
            error={errores.correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <Campo
            label="Contraseña"
            id="password"
            tipo="password"
            maxLength="10"
            value={password}
            error={errores.password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-dark w-100">
            Ingresar
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
