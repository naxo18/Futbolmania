export const regiones = {
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

export const listaRegiones = Object.keys(regiones);

export function obtenerComunas(region) {
  return regiones[region] || [];
}
