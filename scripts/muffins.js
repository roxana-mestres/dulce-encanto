/* COLOR LETRA BOTONES */ 
document.addEventListener('DOMContentLoaded', function () {
    var secciones = document.querySelectorAll('.seccion, .normal');

    secciones.forEach(function (seccion) {
      var botones = seccion.querySelectorAll('.boton');

      // Obtener el color de fondo de la sección
      var colorFondo = window.getComputedStyle(seccion).backgroundColor;

      // Ajustar el color del texto de los botones al color de fondo de la sección
      botones.forEach(function (boton) {
        boton.style.color = colorFondo;
      });
    });
  });

/* SCROLLING */

// Selecciona el navbar
const navbar = document.querySelector('.navbar');

// Variable para almacenar el temporizador
let timeout;

// Función para mostrar el navbar
function mostrarNavbar() {
  navbar.style.top = '0';
}

// Función para ocultar el navbar
function ocultarNavbar() {
  navbar.style.top = '-100px';
}

// Función para reiniciar el temporizador
function reiniciarTemporizador() {
  clearTimeout(timeout);
  ocultarNavbar();
  timeout = setTimeout(mostrarNavbar, 500);
}

// Agrega event listeners para detectar eventos de scroll, mousemove y keydown
document.addEventListener('wheel', reiniciarTemporizador);
document.addEventListener('keydown', reiniciarTemporizador);

// Inicia el temporizador cuando la página se carga por primera vez
window.addEventListener('load', reiniciarTemporizador);
