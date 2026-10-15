import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { leer, guardar } from "../services/persistence";

const CarritoContext = createContext(null);

const CLAVE = "carrito";

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => leer(CLAVE, []));

  useEffect(() => {
    guardar(CLAVE, items);
  }, [items]);

  function agregar(producto) {
    setItems((actuales) => {
      const existente = actuales.find((item) => item.id === producto.id);
      if (existente) {
        return actuales.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...actuales, { ...producto, cantidad: 1 }];
    });
  }

  function eliminar(id) {
    setItems((actuales) => actuales.filter((item) => item.id !== id));
  }

  function cambiarCantidad(id, cantidad) {
    const cantidadFinal = Math.max(1, Number(cantidad) || 1);
    setItems((actuales) =>
      actuales.map((item) =>
        item.id === id ? { ...item, cantidad: cantidadFinal } : item
      )
    );
  }

  function vaciar() {
    setItems([]);
  }

  const total = useMemo(
    () => items.reduce((suma, item) => suma + item.precio * item.cantidad, 0),
    [items]
  );

  const cantidadTotal = useMemo(
    () => items.reduce((suma, item) => suma + item.cantidad, 0),
    [items]
  );

  const valor = {
    items,
    agregar,
    eliminar,
    cambiarCantidad,
    vaciar,
    total,
    cantidadTotal
  };

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return contexto;
}
