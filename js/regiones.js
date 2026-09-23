const regiones = {

    "Región Metropolitana": [
        "Puente Alto",
        "Santiago",
        "Maipú",
        "La Florida",
        "Las Condes"
    ],

    "Valparaíso": [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "Villa Alemana"
    ],

    "Biobío": [
        "Concepción",
        "Talcahuano",
        "Los Ángeles"
    ],

    "La Araucanía": [
        "Temuco",
        "Villarrica",
        "Angol"
    ]

};


const region = document.getElementById("region");
const comuna = document.getElementById("comuna");


if (region && comuna) {

    region.addEventListener("change", function() {

        comuna.innerHTML =
            '<option value="">Seleccione comuna</option>';

        const comunas = regiones[this.value];

        if (comunas) {

            comunas.forEach(function(nombreComuna) {

                comuna.innerHTML += `
                    <option value="${nombreComuna}">
                        ${nombreComuna}
                    </option>
                `;

            });

        }

    });

}