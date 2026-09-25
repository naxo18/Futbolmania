// Obtener carrito guardado

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// Agregar producto

function agregarCarrito(id) {

    const producto = productos.find(
        producto => producto.id === id
    );

    carrito.push(producto);

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    alert("Producto agregado al carrito");

}


// Mostrar carrito

function mostrarCarrito() {

    const contenedor =
        document.getElementById("carrito-container");

    const totalElemento =
        document.getElementById("total");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, indice) => {

        total += producto.precio;

        contenedor.innerHTML += `
            <article class="producto">

                <img src="${producto.imagen}"
                     alt="${producto.nombre}">

                <h3>${producto.nombre}</h3>

                <p>$${producto.precio}</p>

                <button onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>

            </article>
        `;

    });

    totalElemento.textContent =
        "Total: $" + total;

}


// Eliminar

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();

}


// Vaciar

function vaciarCarrito() {

    carrito = [];

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();

}


// Ejecutar

mostrarCarrito();


// Resumen de compra

function mostrarResumenCompra() {

    const contenedor =
        document.getElementById("resumen-container");

    const totalResumen =
        document.getElementById("resumen-total");

    const modal =
        document.getElementById("resumen-modal");

    const direccion =
        document.getElementById("direccion-entrega").value.trim();

    const direccionResumen =
        document.getElementById("resumen-direccion");

    if (!contenedor || !modal) {
        return;
    }

    contenedor.innerHTML = "";

    direccionResumen.textContent =
        direccion === ""
            ? "Dirección de entrega: no ingresada"
            : "Dirección de entrega: " + direccion;

    const conteo = {};

    carrito.forEach(producto => {

        if (!conteo[producto.id]) {

            conteo[producto.id] = {
                ...producto,
                cantidad: 1
            };

        }
        else {

            conteo[producto.id].cantidad++;

        }

    });

    let total = 0;

    Object.values(conteo).forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        contenedor.innerHTML += `
            <article class="producto resumen-item">

                <img src="${producto.imagen}"
                     alt="${producto.nombre}">

                <h3>${producto.nombre}</h3>

                <p>$${producto.precio} x ${producto.cantidad}
                   = $${subtotal}</p>

            </article>
        `;

    });

    totalResumen.textContent = "Total a pagar: $" + total;

    modal.style.display = "flex";

}


// Cerrar resumen

function cerrarResumen() {

    const modal =
        document.getElementById("resumen-modal");

    if (modal) {
        modal.style.display = "none";
    }

}


// Confirmar pago

function confirmarPago() {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío");

        return;

    }

    const direccion =
        document.getElementById("direccion-entrega").value.trim();

    if (direccion === "") {

        alert("Debes ingresar una dirección de entrega");

        return;

    }

    alert(
        "Pago realizado correctamente.\n" +
        "Tu pedido será enviado a: " + direccion
    );

    vaciarCarrito();

    document.getElementById("direccion-entrega").value = "";

    cerrarResumen();

}