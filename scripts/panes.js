document.addEventListener("DOMContentLoaded", function () {
  // Obtener todas las pestañas y contenidos
  const pestanas = document.querySelectorAll(".contenedor-pestanas p");
  const contenidos = document.querySelectorAll(".contenedor-img-texto");
  const dial = document.querySelector(".dial");
  let contenidoActivo = document.querySelector(".contenedor-img-texto.activa");
  let indiceActivo = 0;

  // Asignar un manejador de clic a cada pestaña
  pestanas.forEach((pestana, index) => {
    pestana.addEventListener("click", function () {
      // Remover la clase 'activa' de todas las pestañas
      pestanas.forEach((p) => p.classList.remove("activa"));

      // Agregar la clase 'activa' a la pestaña actual
      this.classList.add("activa");

      // Encontrar el índice del contenido actual
      const indice = Array.from(pestanas).indexOf(this);

      // Si hay contenido activo y es diferente del contenido que se mostrará, ocultarlo
      if (contenidoActivo && contenidoActivo !== contenidos[indice]) {
        contenidoActivo.classList.remove("activa", "desplazarActivo");
        contenidoActivo.classList.add("oculto");

        // Usar un evento de finalización de animación para eliminar las clases después de la animación
        contenidoActivo.addEventListener(
          "animationend",
          function () {
            contenidoActivo.style.left = "0"; // Reiniciar la posición para el siguiente elemento
          },
          { once: true }
        );
      }

      // Agregar la clase 'desplazarActivo' y quitar la clase 'oculto' al contenido correspondiente
      contenidos[indice].classList.remove("oculto");
      contenidos[indice].classList.add("desplazarActivo", "activa");

      // Reiniciar la animación del dial
      dial.style.animation = "none";
      dial.style.transition = "none";
      void dial.offsetWidth;
      dial.style.animation = "girarDial 1s linear";

      // Actualizar el contenido activo
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
  // Función para mostrar el rectángulo con el texto actualizado
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

  // Función para mostrar u ocultar el rectángulo dependiendo de si el mouse está en el centro de la pantalla
  const actualizarRectanguloSegunCentro = (evento) => {
    // Obteniendo las coordenadas del mouse
    const centroX = evento.clientX;
    const centroY = evento.clientY;

    // Obteniendo las dimensiones de la ventana del navegador
    const anchoVentana = window.innerWidth;
    const altoVentana = window.innerHeight;

    // Definiendo el centro de la pantalla
    const centroPantallaX = anchoVentana / 2;
    const centroPantallaY = altoVentana / 2;

    // Calculando la distancia del mouse al centro de la pantalla
    const distancia = Math.sqrt(
      (centroX - centroPantallaX) ** 2 + (centroY - centroPantallaY) ** 2
    );

    // Definiendo un radio para el área de interacción
    const radio = 100; // Por ejemplo, 100 píxeles

    // Verificando si el mouse está cerca del centro de la pantalla
    if (distancia <= radio) {
      // Obtener el texto actualizado según la imagen visible
      const textoActualizado = document.querySelector(
        ".contenedor-img-texto.activa .texto"
      ).textContent;

      // Mostrar el rectángulo con el texto actualizado
      if (!rectangulo) {
        rectangulo = mostrarRectangulo(textoActualizado);
      }
    } else {
      // Si el mouse está fuera del centro, ocultar el rectángulo
      if (rectangulo) {
        rectangulo.remove();
        rectangulo = null;
      }
    }
  };

  // Variable global para almacenar el rectángulo
  let rectangulo = null;

  // Evento para detectar el movimiento del mouse
  document.addEventListener("mousemove", actualizarRectanguloSegunCentro);
}

window.addEventListener('resize', function() {
  // Forzar una recarga de la página cuando cambia el tamaño de la ventana
  window.location.reload();
});

window.addEventListener('resize', function() {
  // Forzar una recarga de la página cuando cambia el tamaño de la ventana
  window.location.reload();
});