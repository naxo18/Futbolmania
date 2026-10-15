const secciones = [
  {
    titulo: "Sobre Futbolmania",
    parrafos: [
      "Futbolmania es una tienda online dedicada a los amantes del fútbol. Nuestro objetivo es ofrecer productos deportivos para jugadores y fanáticos de este deporte.",
      "En nuestra tienda puedes encontrar camisetas, balones, botines y diferentes accesorios relacionados con el fútbol."
    ]
  },
  {
    titulo: "Nuestra misión",
    parrafos: [
      "Buscamos entregar una experiencia de compra sencilla, rápida y accesible para todos los fanáticos del fútbol."
    ]
  },
  {
    titulo: "Nuestro equipo",
    parrafos: [
      "Somos un equipo de estudiantes que desarrolló esta tienda. Ahora utilizamos React, Bootstrap y pruebas unitarias."
    ]
  },
  {
    titulo: "¿Por qué Futbolmania?",
    parrafos: [
      "Porque creemos que el fútbol no es solamente un deporte, sino también una pasión que une a personas de diferentes lugares."
    ]
  }
];

function Nosotros() {
  return (
    <main className="container py-5">
      <h1 className="text-center mb-4">Nosotros</h1>

      {secciones.map((seccion) => (
        <section
          key={seccion.titulo}
          className="card shadow-sm mx-auto mb-4 p-4"
          style={{ maxWidth: "900px" }}
        >
          <h2 className="h4 text-center">{seccion.titulo}</h2>
          {seccion.parrafos.map((parrafo, indice) => (
            <p key={indice} className="mb-2">
              {parrafo}
            </p>
          ))}
        </section>
      ))}
    </main>
  );
}

export default Nosotros;
