import { Link } from "react-router-dom";
import { blogsIniciales } from "../data/blogs";

function Blogs() {
  return (
    <main className="container py-5">
      <h2 className="text-center mb-4">Noticias y datos futbolísticos</h2>

      <div className="row g-4 justify-content-center">
        {blogsIniciales.map((blog) => (
          <div className="col-12 col-md-6 col-lg-4" key={blog.id}>
            <article className="card h-100 shadow-sm">
              <img
                src={blog.imagen}
                className="card-img-top producto-img"
                alt={blog.titulo}
              />
              <div className="card-body d-flex flex-column">
                <h3 className="h5 card-title">{blog.titulo}</h3>
                <p className="card-text">{blog.resumen}</p>
                <Link
                  className="btn btn-outline-success mt-auto"
                  to={`/blogs/${blog.id}`}
                >
                  Leer más
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Blogs;
