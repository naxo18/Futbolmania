import { useEffect, useState } from "react";
import { listarProductos, suscribirProductos } from "../services/db";
import ProductoCard from "../components/ProductoCard";
import { useCarrito } from "../context/CarritoContext";

function Ofertas() {
  const [productos, setProductos] = useState([]);
  const { agregar } = useCarrito();

  useEffect(() => {
    setProductos(listarProductos());
    const desuscribir = suscribirProductos(() => {
      setProductos(listarProductos());
    });
    return desuscribir;
  }, []);

  const productosEnOferta = productos.filter(
    (p) => p.oferta && Number(p.precioOferta) > 0 && Number(p.precioOferta) < Number(p.precio)
  );

  function handleAgregar(producto) {
    const precioActual = producto.oferta && producto.precioOferta > 0 ? producto.precioOferta : producto.precio;
    agregar({ ...producto, precio: precioActual });
  }

  return (
    <main className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Ofertas</h1>
        <p className="text-muted">Aprovecha nuestros descuentos por tiempo limitado</p>
      </div>

      {productosEnOferta.length === 0 ? (
        <div className="text-center">
          <p className="text-muted">No hay productos en oferta en este momento.</p>
        </div>
      ) : (
        <div className="row g-4">
          {productosEnOferta.map((producto) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={producto.id}>
              <ProductoCard producto={producto} onAgregar={handleAgregar} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Ofertas;
