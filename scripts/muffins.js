/* COLOR LETRA BOTONES */ 
document.addEventListener('DOMContentLoaded', function () {
    var secciones = document.querySelectorAll('.seccion, .normal');

    secciones.forEach(function (seccion) {
      var botones = seccion.querySelectorAll('.boton');

      var colorFondo = window.getComputedStyle(seccion).backgroundColor;

      botones.forEach(function (boton) {
        boton.style.color = colorFondo;
      });
    });
  });

/* SCROLLING */
const navbar = document.querySelector('.navbar');

let timeout;

function mostrarNavbar() {
  navbar.style.top = '0';
}

function ocultarNavbar() {
  navbar.style.top = '-100px';
}

function reiniciarTemporizador() {
  clearTimeout(timeout);
  ocultarNavbar();
  timeout = setTimeout(mostrarNavbar, 500);
}

document.addEventListener('wheel', reiniciarTemporizador);
document.addEventListener('keydown', reiniciarTemporizador);

window.addEventListener('load', reiniciarTemporizador);
