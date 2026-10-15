import { renderHook, act } from "@testing-library/react";
import { CarritoProvider, useCarrito } from "../context/CarritoContext";

const envoltorio = ({ children }) => (
  <CarritoProvider>{children}</CarritoProvider>
);

describe("CarritoContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("inicia con el carrito vacío", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper: envoltorio });
    expect(result.current.items.length).toBe(0);
    expect(result.current.total).toBe(0);
    expect(result.current.cantidadTotal).toBe(0);
  });

  it("agrega un producto al carrito", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper: envoltorio });

    act(() => {
      result.current.agregar({ id: 1, nombre: "Camiseta", precio: 1000 });
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.total).toBe(1000);
    expect(result.current.cantidadTotal).toBe(1);
  });

  it("incrementa la cantidad cuando el producto ya existe", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper: envoltorio });

    act(() => {
      result.current.agregar({ id: 1, nombre: "Camiseta", precio: 1000 });
    });
    act(() => {
      result.current.agregar({ id: 1, nombre: "Camiseta", precio: 1000 });
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].cantidad).toBe(2);
    expect(result.current.total).toBe(2000);
  });

  it("elimina un producto del carrito", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper: envoltorio });

    act(() => {
      result.current.agregar({ id: 1, nombre: "Camiseta", precio: 1000 });
    });
    act(() => {
      result.current.eliminar(1);
    });

    expect(result.current.items.length).toBe(0);
    expect(result.current.total).toBe(0);
  });

  it("vacía el carrito completamente", () => {
    const { result } = renderHook(() => useCarrito(), { wrapper: envoltorio });

    act(() => {
      result.current.agregar({ id: 1, nombre: "Camiseta", precio: 1000 });
      result.current.agregar({ id: 2, nombre: "Balón", precio: 2000 });
    });
    act(() => {
      result.current.vaciar();
    });

    expect(result.current.items.length).toBe(0);
    expect(result.current.total).toBe(0);
  });
});
