import {
  correoValido,
  runValido,
  validarPassword,
  formatearPrecio,
  validarProducto
} from "../utils/validaciones";

describe("Utilidades de validación", () => {
  describe("correoValido()", () => {
    it("acepta los dominios permitidos", () => {
      expect(correoValido("alumno@gmail.com")).toBe(true);
      expect(correoValido("alumno@duoc.cl")).toBe(true);
      expect(correoValido("profe@profesor.duoc.cl")).toBe(true);
    });

    it("rechaza dominios no permitidos", () => {
      expect(correoValido("alumno@hotmail.com")).toBe(false);
    });
  });

  describe("runValido()", () => {
    it("acepta un RUN válido sin puntos ni guion", () => {
      expect(runValido("19011022K")).toBe(true);
    });

    it("rechaza un RUN con puntos o guion", () => {
      expect(runValido("19.011.022-K")).toBe(false);
    });

    it("rechaza un RUN demasiado corto", () => {
      expect(runValido("123")).toBe(false);
    });
  });

  describe("validarPassword()", () => {
    it("acepta contraseñas entre 4 y 10 caracteres", () => {
      expect(validarPassword("1234")).toBe(true);
      expect(validarPassword("1234567890")).toBe(true);
    });

    it("rechaza contraseñas fuera de rango", () => {
      expect(validarPassword("123")).toBe(false);
      expect(validarPassword("12345678901")).toBe(false);
    });
  });

  describe("formatearPrecio()", () => {
    it("incluye el signo peso", () => {
      expect(formatearPrecio(29990).startsWith("$")).toBe(true);
    });
  });

  describe("validarProducto()", () => {
    it("devuelve errores cuando el producto es inválido", () => {
      const errores = validarProducto({
        codigo: "P1",
        nombre: "",
        precio: -5,
        stock: -1,
        categoria: ""
      });

      expect(errores.codigo).toBeDefined();
      expect(errores.nombre).toBeDefined();
      expect(errores.precio).toBeDefined();
      expect(errores.stock).toBeDefined();
      expect(errores.categoria).toBeDefined();
    });

    it("no devuelve errores cuando el producto es válido", () => {
      const errores = validarProducto({
        codigo: "P100",
        nombre: "Balón de prueba",
        precio: 1000,
        stock: 3,
        categoria: "Balones"
      });

      expect(Object.keys(errores).length).toBe(0);
    });
  });
});
