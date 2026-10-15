const PREFIJO = "futbolmania_";

export function leer(clave, valorPorDefecto = null) {
  try {
    const crudo = localStorage.getItem(PREFIJO + clave);
    if (crudo === null) {
      return valorPorDefecto;
    }
    return JSON.parse(crudo);
  } catch (error) {
    console.error("Error al leer de localStorage:", clave, error);
    return valorPorDefecto;
  }
}

export function guardar(clave, valor) {
  try {
    localStorage.setItem(PREFIJO + clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.error("Error al guardar en localStorage:", clave, error);
    return false;
  }
}

export function eliminar(clave) {
  localStorage.removeItem(PREFIJO + clave);
}

export function limpiarTodo() {
  Object.keys(localStorage)
    .filter((clave) => clave.startsWith(PREFIJO))
    .forEach((clave) => localStorage.removeItem(clave));
}
