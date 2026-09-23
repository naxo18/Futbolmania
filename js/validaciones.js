const formularioRegistro = document.getElementById("formulario-registro");
const formularioLogin = document.getElementById("formulario-login");



// validar registro


if (formularioRegistro) {

    formularioRegistro.addEventListener("submit", function(event) {

        event.preventDefault();

        let valido = true;

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const run = document.getElementById("run").value;
        const apellidos = document.getElementById("apellidos").value;
        const direccion = document.getElementById("direccion").value;

        document.getElementById("error-nombre").textContent = "";
        document.getElementById("error-correo").textContent = "";

        if (nombre.trim() === "") {
            document.getElementById("error-nombre").textContent =
                "El nombre es obligatorio";
            valido = false;
        }

        if (nombre.length > 50) {
            document.getElementById("error-nombre").textContent =
                "El nombre no puede superar los 50 caracteres";
            valido = false;
        }

        if (!correoValido(correo)) {
            document.getElementById("error-correo").textContent =
                "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com";
            valido = false;
        }

        if (correo.length > 100) {
            document.getElementById("error-correo").textContent =
                "El correo no puede superar los 100 caracteres";
            valido = false;
        }

        if (run.trim() === "") {
            alert("El RUN es obligatorio");
            valido = false;
        }

        if (run.length < 7 || run.length > 9) {
            alert("El RUN debe tener entre 7 y 9 caracteres");
            valido = false;
        }

        if (run.includes(".") || run.includes("-")) {
            alert("El RUN no debe contener puntos ni guion");
            valido = false;
        }

        if (apellidos.trim() === "") {
            alert("Los apellidos son obligatorios");
            valido = false;
        }

        if (direccion.trim() === "") {
            alert("La dirección es obligatoria");
            valido = false;
        }

        if (valido) {
            alert("Registro realizado correctamente");
        }

    });

}



// validar login


if (formularioLogin) {

    formularioLogin.addEventListener("submit", function(event) {

        event.preventDefault();

        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;

        const errorCorreo = document.getElementById("error-correo");
        const errorPassword = document.getElementById("error-password");

        errorCorreo.textContent = "";
        errorPassword.textContent = "";

        let valido = true;

        if (correo.trim() === "") {

            errorCorreo.textContent =
                "El correo es obligatorio";

            valido = false;

        } else if (correo.length > 100) {

            errorCorreo.textContent =
                "El correo no puede superar los 100 caracteres";

            valido = false;

        } else if (!correoValido(correo)) {

            errorCorreo.textContent =
                "Correo no permitido";

            valido = false;
        }

        if (password.trim() === "") {

            errorPassword.textContent =
                "La contraseña es obligatoria";

            valido = false;

        } else if (password.length < 4 || password.length > 10) {

            errorPassword.textContent =
                "La contraseña debe tener entre 4 y 10 caracteres";

            valido = false;
        }

        if (valido) {

            alert("Inicio de sesión correcto");

        }

    });

}



// correo


function correoValido(correo) {

    return (
        correo.endsWith("@duoc.cl") ||
        correo.endsWith("@profesor.duoc.cl") ||
        correo.endsWith("@gmail.com")
    );

}

// validar contacto



const formularioContacto =
    document.getElementById("formulario-contacto");

if (formularioContacto) {

    formularioContacto.addEventListener("submit", function(event) {

        event.preventDefault();

        const nombre =
            document.getElementById("contacto-nombre").value;

        const correo =
            document.getElementById("contacto-correo").value;

        const comentario =
            document.getElementById("comentario").value;

        const errorNombre =
            document.getElementById("error-contacto-nombre");

        const errorCorreo =
            document.getElementById("error-contacto-correo");

        const errorComentario =
            document.getElementById("error-comentario");

        errorNombre.textContent = "";
        errorCorreo.textContent = "";
        errorComentario.textContent = "";

        let valido = true;

        if (nombre.trim() === "") {

            errorNombre.textContent =
                "El nombre es obligatorio";

            valido = false;

        } else if (nombre.length > 100) {

            errorNombre.textContent =
                "Máximo 100 caracteres";

            valido = false;
        }

        if (!correoValido(correo)) {

            errorCorreo.textContent =
                "Correo no permitido";

            valido = false;
        }

        if (correo.length > 100) {

            errorCorreo.textContent =
                "Máximo 100 caracteres";

            valido = false;
        }

        if (comentario.trim() === "") {

            errorComentario.textContent =
                "El comentario es obligatorio";

            valido = false;

        } else if (comentario.length > 500) {

            errorComentario.textContent =
                "Máximo 500 caracteres";

            valido = false;
        }

        if (valido) {

            alert("Mensaje enviado correctamente");

        }

    });

}