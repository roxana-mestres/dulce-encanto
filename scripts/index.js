/* BANDA DE COLOR */

const textos = [
  "alternativas para cada paladar",
  "sin lactosa",
  "sin gluten",
  "vegano",
  "sin perder el sabor tradicional",
];

const bandaColor = document.getElementById("bandaColor");

function actualizarBanda() {
  let contenidoHTML = "";

  // Repite el contenido varias veces para crear un bucle continuo
  for (let i = 0; i < 80; i++) {
    for (const texto of textos) {
      contenidoHTML += `<p>${texto}</p>
            <img
              src="/imagenes/corazon_banda.svg"
              alt="corazones decorativos"
              class="corazones-banda"
            />`;
    }
  }

  // Actualizar el contenido del elemento bandaContenedor
  bandaColor.innerHTML = contenidoHTML;
}

// Llama a la función para establecer el contenido inicial
actualizarBanda();
