import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductoCard from "../components/ProductoCard";

const producto = {
  id: 1,
  nombre: "Camiseta Barcelona",
  precio: 29990,
  categoria: "Camisetas",
  imagen: "/img/camiseta.jpg"
};

function renderizar(onAgregar = () => {}) {
  return render(
    <MemoryRouter>
      <ProductoCard producto={producto} onAgregar={onAgregar} />
    </MemoryRouter>
  );
}

describe("ProductoCard", () => {
  it("muestra el nombre y el precio formateado", () => {
    renderizar();
    expect(screen.getByText("Camiseta Barcelona")).toBeTruthy();
    expect(screen.getByText(/\$29\.990/)).toBeTruthy();
  });

  it("muestra la categoría del producto", () => {
    renderizar();
    expect(screen.getByText("Camisetas")).toBeTruthy();
  });

  it("llama a onAgregar al presionar el botón", () => {
    let agregado = null;
    renderizar((p) => {
      agregado = p;
    });

    fireEvent.click(screen.getByText("Añadir al carrito"));

    expect(agregado).not.toBeNull();
    expect(agregado.id).toBe(1);
  });

  it("genera el enlace correcto al detalle del producto", () => {
    renderizar();
    const enlace = screen.getByText("Ver detalle");
    expect(enlace.getAttribute("href")).toBe("/productos/1");
  });
});
