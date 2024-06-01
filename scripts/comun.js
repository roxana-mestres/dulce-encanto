document.addEventListener("DOMContentLoaded", function() {
  let posPreviaScroll = window.pageYOffset;
  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", function () {
    const posActualScroll = window.pageYOffset;

    if (posPreviaScroll > posActualScroll) {
      navbar.classList.remove("escondido"); // Eliminar la clase "escondido"
    } else {
      navbar.classList.add("escondido"); // Añadir la clase "escondido"
    }

    posPreviaScroll = posActualScroll;
  });
});
