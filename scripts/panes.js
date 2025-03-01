document.addEventListener("DOMContentLoaded", function () {
  const pestanas = document.querySelectorAll(".contenedor-pestanas p");
  const contenidos = document.querySelectorAll(".contenedor-img-texto");
  const dial = document.querySelector(".dial");
  let contenidoActivo = document.querySelector(".contenedor-img-texto.activa");
  let indiceActivo = 0;

  // Asignar un manejador de clic a cada pestaña
  pestanas.forEach((pestana, index) => {
    pestana.addEventListener("click", function () {

      pestanas.forEach((p) => p.classList.remove("activa"));

      this.classList.add("activa");

      const indice = Array.from(pestanas).indexOf(this);

      if (contenidoActivo && contenidoActivo !== contenidos[indice]) {
        contenidoActivo.classList.remove("activa", "desplazarActivo");
        contenidoActivo.classList.add("oculto");
        contenidoActivo.addEventListener(
          "animationend",
          function () {
            contenidoActivo.style.left = "0"; 
          },
          { once: true }
        );
      }

      contenidos[indice].classList.remove("oculto");
      contenidos[indice].classList.add("desplazarActivo", "activa");

      dial.style.animation = "none";
      dial.style.transition = "none";
      void dial.offsetWidth;
      dial.style.animation = "girarDial 1s linear";

      contenidoActivo = contenidos[indice];
    });
  });

  // Por defecto, seleccionar la pestaña "baguette"
  pestanas[0].classList.add("activa");
  contenidos[0].classList.remove("oculto");
  contenidos[0].classList.add("activa");

  // Asignar eventos de clic a las flechas
  const flechaDer = document.querySelectorAll(".flecha.der");
  const flechaIzq = document.querySelectorAll(".flecha.izq");

  flechaDer.forEach((flecha, i) => {
    flecha.addEventListener("click", function () {
      // Ocultar el contenido actual
      contenidos[indiceActivo].classList.remove("activa");
      contenidos[indiceActivo].classList.add("oculto");

      // Calcular el índice del siguiente contenido (circular)
      indiceActivo = (indiceActivo + 1) % contenidos.length;

      // Mostrar el siguiente contenido
      contenidos[indiceActivo].classList.remove("oculto");
      contenidos[indiceActivo].classList.add("activa");

      // Reiniciar la animación del dial
      dial.style.animation = "none";
      dial.style.transition = "none";
      void dial.offsetWidth;
      dial.style.animation = "girarDialMovil 1s linear";
    });
  });

  flechaIzq.forEach((flecha, i) => {
    flecha.addEventListener("click", function () {
      // Ocultar el contenido actual
      contenidos[indiceActivo].classList.remove("activa");
      contenidos[indiceActivo].classList.add("oculto");

      // Calcular el índice del contenido anterior (circular)
      indiceActivo = (indiceActivo - 1 + contenidos.length) % contenidos.length;

      // Mostrar el contenido anterior
      contenidos[indiceActivo].classList.remove("oculto");
      contenidos[indiceActivo].classList.add("activa");

      // Reiniciar la animación del dial
      dial.style.animation = "none";
      dial.style.transition = "none";
      void dial.offsetWidth;
      dial.style.animation = "girarDialMovil 1s linear";
    });
  });
});

/* TEXTO SOBREPUESTO RESPONSIVE */
if (window.innerWidth < 900) {
  const mostrarRectangulo = (texto) => {
    // Crear el rectángulo con el texto superpuesto
    const rectangulo = document.createElement("div");
    rectangulo.textContent = texto;
    rectangulo.classList.add("rectangulo");

    // Estableciendo estilos para el rectángulo
    rectangulo.style.backgroundColor = "rgba(194, 30, 101, 0.9)";
    rectangulo.style.color = "#ffb900";
    rectangulo.style.borderRadius = "20px";
    rectangulo.style.padding = "20px";
    rectangulo.style.position = "fixed";
    rectangulo.style.top = "50%";
    rectangulo.style.left = "50%";
    rectangulo.style.transform = "translate(-50%, -50%)";

    // Insertando el rectángulo en el cuerpo del documento
    document.body.appendChild(rectangulo);

    return rectangulo;
  };

  const actualizarRectanguloSegunCentro = (evento) => {
    const centroX = evento.clientX;
    const centroY = evento.clientY;

    const anchoVentana = window.innerWidth;
    const altoVentana = window.innerHeight;

    const centroPantallaX = anchoVentana / 2;
    const centroPantallaY = altoVentana / 2;

    const distancia = Math.sqrt(
      (centroX - centroPantallaX) ** 2 + (centroY - centroPantallaY) ** 2
    );


    const radio = 100;
    if (distancia <= radio) {
      const textoActualizado = document.querySelector(
        ".contenedor-img-texto.activa .texto"
      ).textContent;

      if (!rectangulo) {
        rectangulo = mostrarRectangulo(textoActualizado);
      }
    } else {
      if (rectangulo) {
        rectangulo.remove();
        rectangulo = null;
      }
    }
  };

  let rectangulo = null;

  document.addEventListener("mousemove", actualizarRectanguloSegunCentro);
}

window.addEventListener('resize', function() {
  window.location.reload();
});

window.addEventListener('resize', function() {
  window.location.reload();
});