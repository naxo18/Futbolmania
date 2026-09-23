const usuariosIniciales = [
    {
        run: "19011022K",
        nombre: "Ignacio",
        apellidos: "Flores",
        correo: "ignacio@gmail.com",
        password: "1234",
        tipo: "Administrador"
    },

    {
        run: "17033044K",
        nombre: "Pedro",
        apellidos: "Soto",
        correo: "pedro@gmail.com",
        password: "12345",
        tipo: "vendedor"
    },

    {
        run: "18022033K",
        nombre: "Juan",
        apellidos: "Pérez",
        correo: "juan@gmail.com",
        password: "123456",
        tipo: "Cliente"
    }
];


// Revisar si ya existen usuarios guardados

let usuarios = JSON.parse(
    localStorage.getItem("usuarios")
);


// Si no existen, crear los usuarios iniciales

if (!usuarios) {

    usuarios = usuariosIniciales;

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}