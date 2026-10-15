import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ soloAdmin = false, children }) {
  const { usuario, esAdministrador } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (soloAdmin && !esAdministrador) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
