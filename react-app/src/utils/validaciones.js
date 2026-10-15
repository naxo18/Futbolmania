export function correoValido(correo) {
  return (
    correo.endsWith("@duoc.cl") ||
    correo.endsWith("@profesor.duoc.cl") ||
    correo.endsWith("@gmail.com")
  );
}

export function runValido(run) {
  return (
    run.trim() !== "" &&
    run.length >= 7 &&
    run.length <= 9 &&
    !run.includes(".") &&
    !run.includes("-")
  );
}

export function validarPassword(password) {
  return password.length >= 4 && password.length <= 10;
}

export function formatearPrecio(valor) {
  return "$" + Number(valor).toLocaleString("es-CL");
}

export function validarProducto(producto) {
  const errores = {};

  if (!producto.codigo || producto.codigo.trim().length < 3) {
    errores.codigo = "El código debe tener al menos 3 caracteres.";
  }

  if (!producto.nombre || producto.nombre.trim() === "") {
    errores.nombre = "Debe ingresar el nombre del producto.";
  } else if (producto.nombre.length > 100) {
    errores.nombre = "El nombre no puede superar los 100 caracteres.";
  }

  if (Number(producto.precio) < 0) {
    errores.precio = "El precio no puede ser negativo.";
  }

  const stock = Number(producto.stock);
  if (stock < 0 || !Number.isInteger(stock)) {
    errores.stock = "El stock debe ser un entero mayor o igual a 0.";
  }

  if (!producto.categoria) {
    errores.categoria = "Debe seleccionar una categoría.";
  }

  return errores;
}
