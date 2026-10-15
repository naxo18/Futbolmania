import { createContext, useContext, useState } from "react";
import { leer, guardar, eliminar } from "../services/persistence";
import { autenticar, crearUsuario } from "../services/db";

const AuthContext = createContext(null);

const CLAVE = "usuarioActual";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => leer(CLAVE, null));

  function iniciarSesion(correo, password) {
    const encontrado = autenticar(correo, password);
    if (!encontrado) {
      return { ok: false, mensaje: "Correo o contraseña incorrectos." };
    }
    guardar(CLAVE, encontrado);
    setUsuario(encontrado);
    return { ok: true, usuario: encontrado };
  }

  function registrar(datosUsuario) {
    try {
      const nuevo = crearUsuario(datosUsuario);
      return { ok: true, usuario: nuevo };
    } catch (error) {
      return { ok: false, mensaje: error.message };
    }
  }

  function cerrarSesion() {
    eliminar(CLAVE);
    setUsuario(null);
  }

  const esAdministrador =
    !!usuario &&
    ["administrador", "vendedor"].includes(
      String(usuario.tipo).toLowerCase()
    );

  const valor = {
    usuario,
    iniciarSesion,
    registrar,
    cerrarSesion,
    esAdministrador
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return contexto;
}
