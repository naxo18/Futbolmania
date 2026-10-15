import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container py-5 text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">La página que buscas no existe.</p>
      <Link className="btn btn-dark" to="/">
        Volver al inicio
      </Link>
    </main>
  );
}

export default NotFound;
