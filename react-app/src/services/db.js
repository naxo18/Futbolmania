import { leer, guardar } from "./persistence";
import { productosIniciales } from "../data/productos";
import { usuariosIniciales } from "../data/usuarios";

function crearStore(clave, semilla) {
  let datos = leer(clave, null);

  if (!Array.isArray(datos)) {
    datos = semilla;
    guardar(clave, datos);
  } else {
    const seedMap = new Map(semilla.map((p) => [p.id, p]));
    let modificado = false;
    datos = datos.map((p) => {
      const s = seedMap.get(p.id);
      if (s && s.oferta && p.oferta !== true) {
        modificado = true;
        return { ...p, oferta: s.oferta, precioOferta: s.precioOferta };
      }
      return p;
    });
    if (modificado) {
      guardar(clave, datos);
    }
  }

  const oyentes = new Set();

  function notificar() {
    oyentes.forEach((fn) => fn());
  }

  return {
    getDatos() {
      return datos;
    },
    setDatos(nuevos) {
      datos = nuevos;
      guardar(clave, datos);
      notificar();
    },
    suscribir(fn) {
      oyentes.add(fn);
      return () => oyentes.delete(fn);
    }
  };
}

const storeProductos = crearStore("productos", productosIniciales);
const storeUsuarios = crearStore("usuarios", usuariosIniciales);

function siguienteId(lista) {
  if (lista.length === 0) {
    return 1;
  }
  return Math.max(...lista.map((item) => item.id)) + 1;
}

function generarCodigo(lista) {
  const maximo = lista.reduce((max, item) => {
    const numero = Number(String(item.codigo || "").replace("P", ""));
    return Number.isNaN(numero) ? max : Math.max(max, numero);
  }, 0);
  return "P" + String(maximo + 1).padStart(3, "0");
}

/* ============================ PRODUCTOS ============================ */

export function listarProductos() {
  return storeProductos.getDatos();
}

export function obtenerProducto(id) {
  return storeProductos.getDatos().find((p) => p.id === Number(id));
}

export function crearProducto(producto) {
  const lista = storeProductos.getDatos();
  const nuevo = {
    id: siguienteId(lista),
    codigo: producto.codigo && producto.codigo.trim()
      ? producto.codigo.trim()
      : generarCodigo(lista),
    nombre: producto.nombre || "",
    descripcion: producto.descripcion || "",
    precio: Number(producto.precio) || 0,
    stock: Number(producto.stock) || 0,
    stockCritico: Number(producto.stockCritico) || 0,
    categoria: producto.categoria || "Accesorios",
    imagen: producto.imagen || ""
  };
  storeProductos.setDatos([...lista, nuevo]);
  return nuevo;
}

export function actualizarProducto(id, cambios) {
  const lista = storeProductos.getDatos().map((p) =>
    p.id === Number(id) ? { ...p, ...cambios, id: p.id } : p
  );
  storeProductos.setDatos(lista);
  return obtenerProducto(id);
}

export function eliminarProducto(id) {
  const lista = storeProductos
    .getDatos()
    .filter((p) => p.id !== Number(id));
  storeProductos.setDatos(lista);
}

export function suscribirProductos(fn) {
  return storeProductos.suscribir(fn);
}

/* ============================ USUARIOS ============================ */

export function listarUsuarios() {
  return storeUsuarios.getDatos();
}

export function obtenerUsuario(run) {
  return storeUsuarios.getDatos().find((u) => u.run === run);
}

export function crearUsuario(usuario) {
  const lista = storeUsuarios.getDatos();
  const existe = lista.some(
    (u) => u.correo === usuario.correo || u.run === usuario.run
  );
  if (existe) {
    throw new Error("Este correo o RUN ya está registrado.");
  }
  const nuevo = {
    run: usuario.run,
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    correo: usuario.correo,
    password: usuario.password,
    direccion: usuario.direccion || "",
    region: usuario.region || "",
    comuna: usuario.comuna || "",
    tipo: usuario.tipo || "Cliente"
  };
  storeUsuarios.setDatos([...lista, nuevo]);
  return nuevo;
}

export function actualizarUsuario(run, cambios) {
  const lista = storeUsuarios.getDatos().map((u) =>
    u.run === run ? { ...u, ...cambios, run: u.run } : u
  );
  storeUsuarios.setDatos(lista);
  return obtenerUsuario(run);
}

export function eliminarUsuario(run) {
  const lista = storeUsuarios.getDatos().filter((u) => u.run !== run);
  storeUsuarios.setDatos(lista);
}

export function autenticar(correo, password) {
  const usuario = storeUsuarios
    .getDatos()
    .find((u) => u.correo === correo && u.password === password);
  return usuario || null;
}

export function suscribirUsuarios(fn) {
  return storeUsuarios.suscribir(fn);
}

export function reiniciarDatos() {
  storeProductos.setDatos(productosIniciales);
  storeUsuarios.setDatos(usuariosIniciales);
}
