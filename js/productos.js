const productos = [
    {
        id: 1,
        nombre: "Camiseta Barcelona",
        precio: 29990,
        imagen: "../img/camiseta.jpg",
        categoria: "Camisetas"
    },
    {
        id: 2,
        nombre: "Balón Adidas Trionda",
        precio: 24990,
        imagen: "../img/balonadidas.jpg",
        categoria: "Balones"
    },
    {
        id: 3,
        nombre: "Zapatos Adidas ",
        precio: 59990,
        imagen: "../img/zapatos.jpg",
        categoria: "Botines"
    },
    {
        id: 4,
        nombre: "Camiseta Real madrid",
        precio: 24990,
        imagen: "../img/camiseta3.jpg",
        categoria: "Camisetas"
    },
    {
        id: 5,
        nombre: "Camiseta Bayern Munich",
        precio: 34990,
        imagen: "../img/camiseta4.jpg",
        categoria: "Camisetas"
    },
    {
        id: 6,
        nombre: "Camiseta Colo-Colo",
        precio: 39990,
        imagen: "../img/camiseta5.jpg",
        categoria: "Camisetas"
    },
    {
        id: 7,
        nombre: "Balón Adidas Tango",
        precio: 15990,
        imagen: "../img/balon.4.avif",
        categoria: "Balones"
    },
    {
        id: 8,
        nombre: "Balón Adidas Jabulani",
        precio: 19990,
        imagen: "../img/jabulani5.jpg",
        categoria: "Balones"
    },
    {
        id: 9,
        nombre: "Balón Nike 90",
        precio: 29990,
        imagen: "../img/balon90.jpg",
        categoria: "Balones"
    },
    {
        id: 10,
        nombre: "Zapatos Adidas Predator",
        precio: 49990,
        imagen: "../img/zapatos4.jpg",
        categoria: "Botines"
    },
    {
        id: 11,
        nombre: "Zapatos Nike Mercurial",
        precio: 69990,
        imagen: "../img/zapatos5.jpg",
        categoria: "Botines"
    },
    {
        id: 12,
        nombre: "Zapatos Puma Future",
        precio: 79990,
        imagen: "../img/zapatos6.jpg",
        categoria: "Botines"
    }
];

const contenedor =
    document.getElementById("lista-productos");

const menuCategorias =
    document.getElementById("categorias-menu");


function mostrarProductos(categoria) {

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    productos.forEach(producto => {

        if (categoria !== "Todos" &&
            producto.categoria !== categoria) {
            return;
        }

        contenedor.innerHTML += `

            <article class="producto">

                <img src="${producto.imagen}"
                     alt="${producto.nombre}">

                <h3>${producto.nombre}</h3>

                <p>$${producto.precio}</p>

                <button onclick="agregarCarrito(${producto.id})">
                    Añadir
                </button>

                <a href="detalle-producto.html?id=${producto.id}">
                    Ver detalle
                </a>

            </article>

        `;

    });

}


// Construir el menú de categorías

if (menuCategorias) {

    const categorias = ["Todos"];

    productos.forEach(producto => {

        if (!categorias.includes(producto.categoria)) {
            categorias.push(producto.categoria);
        }

    });

    categorias.forEach(categoria => {

        const boton = document.createElement("button");

        boton.textContent = categoria;

        boton.onclick = function() {

            menuCategorias
                .querySelectorAll("button")
                .forEach(b => b.classList.remove("activa"));

            boton.classList.add("activa");

            mostrarProductos(categoria);

        };

        menuCategorias.appendChild(boton);

    });

}


mostrarProductos("Todos");