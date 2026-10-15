import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import BlogDetalle from "./pages/BlogDetalle";
import NotFound from "./pages/NotFound";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminProductoForm from "./pages/admin/AdminProductoForm";
import AdminUsuarios from "./pages/admin/AdminUsuarios";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetalle />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute soloAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route
            path="productos/nuevo"
            element={<AdminProductoForm />}
          />
          <Route
            path="productos/editar/:id"
            element={<AdminProductoForm />}
          />
          <Route path="usuarios" element={<AdminUsuarios />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
