const productos = [

    {
        id: 1,
        nombre: "Camiseta Barcelona",
        precio: 29990,
        imagen: "../img/camiseta.jpg"
    },

    {
        id: 2,
        nombre: "Balon Adidas",
        precio: 24990,
        imagen: "../img/balon.jpg"
    },

    {
        id: 3,
        nombre: "Zapatos Adidas",
        precio: 59990,
        imagen: "../img/zapatos.jpg"
    }

]

const contenedor = document.getElementById("lista-productos");

productos.forEach(producto => {

    contenedor.innerHTML += `
        <article class="producto">

        <img src="${producto.imagen}">

        <h3>${producto.nombre}</h3>

        <p>$${producto.precio}</p>

         <button onclick="agregarCarrito(${producto.id})">
                Añadir
            </button>

            </article>

        `;
});