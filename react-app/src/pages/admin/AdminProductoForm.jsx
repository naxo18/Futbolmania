import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductos } from "../../hooks/useProductos";
import { crearProducto, actualizarProducto } from "../../services/db";
import { validarProducto } from "../../utils/validaciones";
import { categorias } from "../../data/productos";
import Campo from "../../components/Campo";
import Mensaje from "../../components/Mensaje";

function AdminProductoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productos = useProductos();

  const enEdicion = Boolean(id);
  const productoExistente = enEdicion
    ? productos.find((p) => p.id === Number(id))
    : null;

  const [datos, setDatos] = useState({
    codigo: productoExistente?.codigo || "",
    nombre: productoExistente?.nombre || "",
    descripcion: productoExistente?.descripcion || "",
    precio: productoExistente?.precio ?? "",
    stock: productoExistente?.stock ?? "",
    stockCritico: productoExistente?.stockCritico ?? "",
    categoria: productoExistente?.categoria || "",
    imagen: productoExistente?.imagen || ""
  });
  const [errores, setErrores] = useState({});

  function actualizar(campo, valor) {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }));
  }

  function manejarSubmit(evento) {
    evento.preventDefault();
    const nuevosErrores = validarProducto(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    const datosFinales = {
      ...datos,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      stockCritico: Number(datos.stockCritico) || 0
    };

    if (enEdicion) {
      actualizarProducto(id, datosFinales);
    } else {
      crearProducto(datosFinales);
    }

    navigate("/admin/productos");
  }

  if (enEdicion && !productoExistente) {
    return (
      <div>
        <h2>Producto no encontrado</h2>
        <button
          className="btn btn-dark"
          onClick={() => navigate("/admin/productos")}
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="h3 mb-4">
        {enEdicion ? "Editar producto" : "Crear nuevo producto"}
      </h1>

      <Mensaje tipo="info">
        {enEdicion
          ? "Modifica los campos y guarda los cambios."
          : "Completa el formulario para agregar un producto."}
      </Mensaje>

      <form onSubmit={manejarSubmit} noValidate>
        <Campo
          label="Código"
          id="codigo"
          value={datos.codigo}
          error={errores.codigo}
          placeholder="Ej: P013"
          onChange={(e) => actualizar("codigo", e.target.value)}
        />

        <Campo
          label="Nombre"
          id="nombre"
          value={datos.nombre}
          error={errores.nombre}
          onChange={(e) => actualizar("nombre", e.target.value)}
        />

        <Campo
          label="Descripción"
          id="descripcion"
          as="textarea"
          value={datos.descripcion}
          onChange={(e) => actualizar("descripcion", e.target.value)}
        />

        <div className="row">
          <div className="col-md-4">
            <Campo
              label="Precio"
              id="precio"
              tipo="number"
              min="0"
              value={datos.precio}
              error={errores.precio}
              onChange={(e) => actualizar("precio", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <Campo
              label="Stock"
              id="stock"
              tipo="number"
              min="0"
              value={datos.stock}
              error={errores.stock}
              onChange={(e) => actualizar("stock", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <Campo
              label="Stock crítico"
              id="stockCritico"
              tipo="number"
              min="0"
              value={datos.stockCritico}
              onChange={(e) => actualizar("stockCritico", e.target.value)}
            />
          </div>
        </div>

        <Campo
          label="Categoría"
          id="categoria"
          as="select"
          value={datos.categoria}
          error={errores.categoria}
          opciones={[
            { value: "", label: "Seleccione" },
            ...categorias.map((c) => ({ value: c, label: c }))
          ]}
          onChange={(e) => actualizar("categoria", e.target.value)}
        />

        <Campo
          label="Imagen (ruta)"
          id="imagen"
          value={datos.imagen}
          placeholder="Ej: /img/camiseta.jpg"
          onChange={(e) => actualizar("imagen", e.target.value)}
        />

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            {enEdicion ? "Guardar cambios" : "Guardar producto"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/admin/productos")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductoForm;
