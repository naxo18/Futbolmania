import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import { AuthProvider } from "../context/AuthContext";
import { reiniciarDatos } from "../services/db";

function renderizar() {
  return render(
    <AuthProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthProvider>
  );
}

describe("Página de Login", () => {
  beforeEach(() => {
    localStorage.clear();
    reiniciarDatos();
  });

  it("muestra error si el correo está vacío", () => {
    renderizar();
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));
    expect(screen.getByText("El correo es obligatorio.")).toBeTruthy();
  });

  it("muestra error si el dominio del correo no es válido", () => {
    renderizar();

    fireEvent.change(screen.getByLabelText(/correo/i), {
      target: { value: "usuario@hotmail.com" }
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "1234" }
    });
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(
      screen.getByText("Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.")
    ).toBeTruthy();
  });

  it("muestra error con credenciales incorrectas", () => {
    renderizar();

    fireEvent.change(screen.getByLabelText(/correo/i), {
      target: { value: "ignacio@gmail.com" }
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "9999" }
    });
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(
      screen.getByText("Correo o contraseña incorrectos.")
    ).toBeTruthy();
  });
});
