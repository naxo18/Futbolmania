
const productosIniciales = [
    {
        codigo: "P001",
        nombre: "Camiseta Barcelona",
        descripcion: "Camiseta oficial del Barcelona",
        precio: 29990,
        stock: 10,
        stockCritico: 3,
        categoria: "Camisetas",
        imagen: "../img/camiseta.jpg"
    },
    {
        codigo: "P002",
        nombre: "Balón Adidas",
        descripcion: "Balón de fútbol Adidas",
        precio: 24990,
        stock: 15,
        stockCritico: 5,
        categoria: "Balones",
        imagen: "../img/balon.jpg"
    },
    {
        codigo: "P003",
        nombre: "Botines Nike",
        descripcion: "Botines Nike para fútbol",
        precio: 59990,
        stock: 8,
        stockCritico: 2,
        categoria: "Botines",
        imagen: "../img/botines.jpg"
    }
];



let productosAdmin = JSON.parse(localStorage.getItem("productosAdmin"));



if (!productosAdmin) {

    productosAdmin = productosIniciales;

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(productosAdmin)
    );
}



function mostrarProductosAdmin() {

    const tabla = document.getElementById("tabla-productos");

    if (!tabla) {
        return;
    }

    tabla.innerHTML = "";

    productosAdmin.forEach(function(producto, indice) {

        tabla.innerHTML += `
            <tr>

                <td>${producto.codigo}</td>

                <td>${producto.nombre}</td>

                <td>$${producto.precio}</td>

                <td>${producto.stock}</td>

                <td>${producto.categoria}</td>

                <td>

                    <button onclick="eliminarProductoAdmin(${indice})">
                        Eliminar
                    </button>

                </td>

            </tr>
        `;

    });
}



function eliminarProductoAdmin(indice) {

    const confirmar = confirm(
        "¿Está seguro de eliminar este producto?"
    );

    if (confirmar) {

        productosAdmin.splice(indice, 1);

        localStorage.setItem(
            "productosAdmin",
            JSON.stringify(productosAdmin)
        );

        mostrarProductosAdmin();

        alert("Producto eliminado correctamente");
    }
}

const formularioProducto = document.getElementById("formulario-producto");

if (formularioProducto) {

    formularioProducto.addEventListener("submit", function(event) {

        event.preventDefault();


        const codigo = document.getElementById("codigo").value.trim();

        const nombre = document.getElementById("nombre").value.trim();

        const descripcion =
            document.getElementById("descripcion").value.trim();

        const precio =
            Number(document.getElementById("precio").value);

        const stock =
            Number(document.getElementById("stock").value);

        const stockCritico =
            Number(document.getElementById("stockCritico").value || 0);

        const categoria =
            document.getElementById("categoria").value;

        const imagen =
            document.getElementById("imagen").value.trim();


        
        if (codigo.length < 3) {

            alert("El código debe tener al menos 3 caracteres.");

            return;
        }


        
        if (nombre === "") {

            alert("Debe ingresar el nombre del producto.");

            return;
        }


        if (nombre.length > 100) {

            alert("El nombre no puede superar los 100 caracteres.");

            return;
        }


        
        if (precio < 0) {

            alert("El precio no puede ser negativo.");

            return;
        }


        
        if (stock < 0 || !Number.isInteger(stock)) {

            alert("El stock debe ser un número entero mayor o igual a 0.");

            return;
        }


        
        const nuevoProducto = {

            codigo: codigo,

            nombre: nombre,

            descripcion: descripcion,

            precio: precio,

            stock: stock,

            stockCritico: stockCritico,

            categoria: categoria,

            imagen: imagen
                ? "../../img/" + imagen
                : ""
        };


        
        productosAdmin.push(nuevoProducto);


        
        localStorage.setItem(
            "productosAdmin",
            JSON.stringify(productosAdmin)
        );


        alert("Producto creado correctamente");


        
        window.location.href = "productos.html";

    });

}



mostrarProductosAdmin();