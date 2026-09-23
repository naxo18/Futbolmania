const productos = [
    {
        id: 1,
        nombre: "Camiseta Barcelona",
        precio: 29990,
        imagen: "../img/camiseta.jpg"
    },
    {
        id: 2,
        nombre: "Balón Adidas",
        precio: 24990,
        imagen: "../img/balonadidas.jpg"
    },
    {
        id: 3,
        nombre: "Botines Nike",
        precio: 59990,
        imagen: "../img/zapatos.jpg"
    }
];

const contenedor =
    document.getElementById("lista-productos");

productos.forEach(producto => {

    contenedor.innerHTML += `

        <article class="producto">

            <img src="${producto.imagen}"
                 alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <p>$${producto.precio}</p>

            <button onclick="agregarCarrito(${producto.id})">
                Añadir
            </button>

            <a href="detalle-producto.html">
                Ver detalle
            </a>

        </article>

    `;

});