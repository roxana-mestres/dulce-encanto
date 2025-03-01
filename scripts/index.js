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

  for (let i = 0; i < 80; i++) {
    for (const texto of textos) {
      contenidoHTML += `<p>${texto}</p>
            <img
              src="/dulce-encanto/imagenes/corazon_banda.svg"
              alt="corazones decorativos"
              class="corazones-banda"
            />`;
    }
  }

  bandaColor.innerHTML = contenidoHTML;
}

actualizarBanda();
