// Función para cambiar los colores según la pestaña activa
function cambiarColores(pestanaId) {
  console.log(pestanaId);
  const body = document.querySelector("body");
  const botones = document.querySelectorAll(".boton");
  const barraLateral = document.querySelector(".contenedor-pestanas");

  switch (pestanaId) {
    case "zumos":
      body.style.backgroundColor = "#ffb900";
      botones.forEach((boton) => {
        boton.style.color = "#ffb900";
        boton.style.backgroundColor = "#F22283";
      });
      barraLateral.style.backgroundColor = "#ffb900";
      barraLateral.querySelectorAll("p").forEach((p) => {
        p.style.color = "#F22283";
      });
      break;
    case "matcha":
      body.style.backgroundColor = "#E0F0BA";
      botones.forEach((boton) => {
        boton.style.color = "#E0F0BA";
        boton.style.backgroundColor = "#173500";
      });
      barraLateral.style.backgroundColor = "#E0F0BA";
      barraLateral.querySelectorAll("p").forEach((p) => {
        p.style.color = "#173500";
      });
      break;
    case "expresso":
      body.style.backgroundColor = "#CFE0EF";
      botones.forEach((boton) => {
        boton.style.color = "#CFE0EF";
        boton.style.backgroundColor = "#002864";
      });
      barraLateral.style.backgroundColor = "#CFE0EF";
      barraLateral.querySelectorAll("p").forEach((p) => {
        p.style.color = "#002864";
      });
      break;
    case "chai":
      body.style.backgroundColor = "#FD9AC8";
      botones.forEach((boton) => {
        boton.style.color = "#FD9AC8";
        boton.style.backgroundColor = "#6D0033";
      });
      barraLateral.style.backgroundColor = "#FD9AC8";
      barraLateral.querySelectorAll("p").forEach((p) => {
        p.style.color = "#6D0033";
      });
      break;
    case "capuccino":
      body.style.backgroundColor = "#AFA8CC";
      botones.forEach((boton) => {
        boton.style.color = "#AFA8CC";
        boton.style.backgroundColor = "#310788";
      });
      barraLateral.style.backgroundColor = "#AFA8CC";
      barraLateral.querySelectorAll("p").forEach((p) => {
        p.style.color = "#310788";
      });
      break;
    case "frapuccino":
      body.style.backgroundColor = "#C5A3C0";
      botones.forEach((boton) => {
        boton.style.color = "#C5A3C0";
        boton.style.backgroundColor = "#6D005B";
      });
      barraLateral.style.backgroundColor = "#C5A3C0";
      barraLateral.querySelectorAll("p").forEach((p) => {
        p.style.color = "#6D005B";
      });
      break;
  }
}

/* Función para poner y quitar clase "activa" */

document.addEventListener("DOMContentLoaded", function () {
  const pestanas = document.querySelectorAll(".nombre-bebida");
  const contenido = document.querySelectorAll(".contenedor-bebida");

  pestanas.forEach((pestana, i) => {
    pestana.addEventListener("click", function () {
      pestanas.forEach((p) => p.classList.remove("activa"));
      contenido.forEach((c) => c.classList.remove("activa"));

      pestana.classList.add("activa");
      contenido[i].classList.add("activa");

      cambiarColores(pestana.id);
    });
  });
});

/* Cambio de pestaña con flechas */
document.addEventListener("DOMContentLoaded", () => {
  const flechaDer = document.querySelectorAll(".flecha-der");
  const flechaIzq = document.querySelectorAll(".flecha-izq");
  const contenidoPestana = document.querySelectorAll(".contenedor-bebida");
  const pestanas = document.querySelectorAll(".nombre-bebida");

  flechaDer.forEach((flecha, i) => {
    flecha.addEventListener("click", function () {
      // Ocultar todas las pestañas
      contenidoPestana.forEach((contenido) => contenido.classList.remove("activa"));
      
      // Calcular el índice de la nueva pestaña activa
      const nuevaPestanaIndex = (i + 1) % contenidoPestana.length;

      // Mostrar la nueva pestaña activa
      contenidoPestana[nuevaPestanaIndex].classList.add("activa");

      // Obtener el ID de la nueva pestaña activa
      const nuevaPestanaId = pestanas[nuevaPestanaIndex].id;

      // Cambiar los colores según la nueva pestaña activa
      cambiarColores(nuevaPestanaId);
    });
  });

  flechaIzq.forEach((flecha, i) => {
    flecha.addEventListener("click", function () {
      // Ocultar todas las pestañas
      contenidoPestana.forEach((contenido) => contenido.classList.remove("activa"));
      
      // Calcular el índice de la nueva pestaña activa
      const nuevaPestanaIndex = (i - 1 + contenidoPestana.length) % contenidoPestana.length;

      // Mostrar la nueva pestaña activa
      contenidoPestana[nuevaPestanaIndex].classList.add("activa");

      // Obtener el ID de la nueva pestaña activa
      const nuevaPestanaId = pestanas[nuevaPestanaIndex].id;

      // Cambiar los colores según la nueva pestaña activa
      cambiarColores(nuevaPestanaId);
    });
  });
});

window.addEventListener('resize', function() {
  // Forzar una recarga de la página cuando cambia el tamaño de la ventana
  window.location.reload();
});