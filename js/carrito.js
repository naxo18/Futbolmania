// Productos disponibles

const productosCarrito = [
    {
        id: 1,
        nombre: "Camiseta Barcelona",
        precio: 29990
    },
    {
        id: 2,
        nombre: "Balón Adidas",
        precio: 24990
    },
    {
        id: 3,
        nombre: "Botines Nike",
        precio: 59990
    }
];


// Obtener carrito guardado

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// Agregar producto

function agregarCarrito(id) {

    const producto = productosCarrito.find(
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