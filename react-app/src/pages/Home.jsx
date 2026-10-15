import { Link } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { useCarrito } from "../context/CarritoContext";
import ProductoCard from "../components/ProductoCard";
import Mensaje from "../components/Mensaje";
import { useState } from "react";

function Home() {
  const productos = useProductos();
  const { agregar } = useCarrito();
  const [aviso, setAviso] = useState("");

  const destacados = productos.slice(0, 3);

  function manejarAgregar(producto) {
    agregar(producto);
    setAviso(`"${producto.nombre}" se agregó al carrito.`);
  }

  return (
    <main>
      <section className="hero text-center text-white d-flex align-items-center">
        <div className="hero-contenido container">
          <h1 className="display-4 fw-bold">Vive el fútbol</h1>
          <p className="lead">
            Encuentra camisetas, balones, botines y todos los accesorios que
            necesitas.
          </p>
          <Link to="/productos" className="btn btn-success btn-lg">
            Ver productos
          </Link>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center mb-4">Productos destacados</h2>

        <Mensaje tipo="success">{aviso}</Mensaje>

        <div className="row g-4 justify-content-center">
          {destacados.map((producto) => (
            <div className="col-12 col-sm-6 col-lg-4" key={producto.id}>
              <ProductoCard producto={producto} onAgregar={manejarAgregar} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-5 text-center">
        <div className="container">
          <h2 className="mb-4">¿Quiénes somos?</h2>
          <p className="mx-auto" style={{ maxWidth: "800px" }}>
            En Futbolmania buscamos acercar los mejores productos deportivos a
            todos los fanáticos del fútbol. Contamos con camisetas, balones,
            zapatos y accesorios para jugadores y aficionados.
          </p>
        </div>
      </section>

      <section className="container py-5 text-center">
        <h2 className="mb-4">Video destacado</h2>
        <video
          className="w-100 rounded"
          src="/video/videotienda.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
        ></video>
      </section>
    </main>
  );
}

export default Home;
