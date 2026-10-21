const KEY = "futbolmania_pedidos";

function leerPedidos() {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function guardarPedidos(pedidos) {
  localStorage.setItem(KEY, JSON.stringify(pedidos));
}

export function generarNumeroPedido() {
  const fecha = Date.now().toString().slice(-6);
  const aleatorio = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `FM-${fecha}-${aleatorio}`;
}

export function crearPedido(pedido) {
  const pedidos = leerPedidos();
  const nuevo = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() + Math.random().toString(36).slice(2),
    numero: generarNumeroPedido(),
    fecha: new Date().toISOString(),
    estado: "exitosa",
    ...pedido
  };
  pedidos.push(nuevo);
  guardarPedidos(pedidos);
  return nuevo;
}

export function obtenerPedido(id) {
  const pedidos = leerPedidos();
  return pedidos.find((p) => p.id === id);
}

export function listarPedidos() {
  return leerPedidos();
}
