import { Link, useParams } from "react-router-dom";
import { blogsIniciales } from "../data/blogs";

function BlogDetalle() {
  const { id } = useParams();
  const blog = blogsIniciales.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <main className="container py-5 text-center">
        <h2>Artículo no encontrado</h2>
        <Link className="btn btn-dark mt-3" to="/blogs">
          Volver al blog
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <article className="card shadow-sm mx-auto p-4" style={{ maxWidth: "800px" }}>
        <img
          src={blog.imagen}
          className="img-fluid rounded mb-4"
          alt={blog.titulo}
        />
        <h2 className="mb-3">{blog.titulo}</h2>

        {blog.contenido.map((parrafo, indice) => (
          <p key={indice}>{parrafo}</p>
        ))}

        <Link className="mt-3" to="/blogs">
          ← Volver al blog
        </Link>
      </article>
    </main>
  );
}

export default BlogDetalle;
