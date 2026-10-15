import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  listarUsuarios,
  crearUsuario,
  autenticar,
  eliminarUsuario,
  reiniciarDatos
} from "../services/db";

describe("Capa de datos (base de datos simulada) - Productos", () => {
  beforeEach(() => {
    reiniciarDatos();
  });

  it("lista los productos iniciales", () => {
    expect(listarProductos().length).toBe(12);
  });

  it("crea un producto con id incremental y código autogenerado", () => {
    const nuevo = crearProducto({
      nombre: "Guantes de arquero",
      precio: 9990,
      stock: 5,
      categoria: "Accesorios"
    });

    expect(nuevo.id).toBe(13);
    expect(nuevo.codigo).toBe("P013");
    expect(listarProductos().length).toBe(13);
  });

  it("obtiene un producto por su id", () => {
    expect(obtenerProducto(1).nombre).toContain("Barcelona");
  });

  it("actualiza los datos de un producto", () => {
    actualizarProducto(1, { precio: 1000 });
    expect(obtenerProducto(1).precio).toBe(1000);
    expect(obtenerProducto(1).nombre).toContain("Barcelona");
  });

  it("elimina un producto", () => {
    eliminarProducto(1);
    expect(obtenerProducto(1)).toBeUndefined();
    expect(listarProductos().length).toBe(11);
  });
});

describe("Capa de datos (base de datos simulada) - Usuarios", () => {
  beforeEach(() => {
    reiniciarDatos();
  });

  it("autentica credenciales válidas", () => {
    const usuario = autenticar("ignacio@gmail.com", "1234");
    expect(usuario).not.toBeNull();
    expect(usuario.nombre).toBe("Ignacio");
  });

  it("rechaza credenciales inválidas", () => {
    expect(autenticar("ignacio@gmail.com", "incorrecta")).toBeNull();
  });

  it("crea un usuario nuevo", () => {
    crearUsuario({
      run: "11111111A",
      nombre: "Ana",
      apellidos: "Díaz",
      correo: "ana@gmail.com",
      password: "1234",
      tipo: "Cliente"
    });
    expect(listarUsuarios().length).toBe(4);
  });

  it("no permite correo o RUN duplicado", () => {
    expect(() =>
      crearUsuario({
        run: "19011022K",
        nombre: "Duplicado",
        correo: "otro@gmail.com",
        password: "1234"
      })
    ).toThrow();
  });

  it("elimina un usuario", () => {
    eliminarUsuario("18022033K");
    expect(listarUsuarios().length).toBe(2);
  });
});
