import { useMemo, useState } from "react";
import { useProductos } from "../hooks/useProductos";
import { useCarrito } from "../context/CarritoContext";
import { categorias } from "../data/productos";
import ProductoCard from "../components/ProductoCard";
import CategoriaFiltro from "../components/CategoriaFiltro";
import Buscador from "../components/Buscador";
import Mensaje from "../components/Mensaje";

function Productos() {
  const productos = useProductos();
  const { agregar } = useCarrito();

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [aviso, setAviso] = useState("");

  const opciones = ["Todos", ...categorias];

  const filtrados = useMemo(() => {
    return productos.filter((producto) => {
      const coincideCategoria =
        categoriaActiva === "Todos" ||
        producto.categoria === categoriaActiva;
      const coincideBusqueda = producto.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
    });
  }, [productos, categoriaActiva, busqueda]);

  function manejarAgregar(producto) {
    agregar(producto);
    setAviso(`"${producto.nombre}" se agregó al carrito.`);
  }

  return (
    <main>
      <section className="container py-5">
        <h2 className="text-center mb-4">Todos nuestros productos</h2>

        <div className="mx-auto" style={{ maxWidth: "600px" }}>
          <Buscador
            valor={busqueda}
            onCambiar={setBusqueda}
            placeholder="Buscar por nombre..."
          />
        </div>

        <CategoriaFiltro
          categorias={opciones}
          categoriaActiva={categoriaActiva}
          onCambiar={setCategoriaActiva}
        />

        <Mensaje tipo="success">{aviso}</Mensaje>

        <div className="row g-4">
          {filtrados.map((producto) => (
            <div className="col-12 col-sm-6 col-lg-4" key={producto.id}>
              <ProductoCard producto={producto} onAgregar={manejarAgregar} />
            </div>
          ))}
        </div>

        {filtrados.length === 0 && (
          <p className="text-center text-muted">
            No se encontraron productos.
          </p>
        )}
      </section>
    </main>
  );
}

export default Productos;
