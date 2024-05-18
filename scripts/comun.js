document.addEventListener("DOMContentLoaded", function() {
  let posPreviaScroll = window.pageYOffset;
  const navbar = document.querySelector("nav");

  console.log(navbar);

  window.addEventListener("scroll", function () {
    console.log("scrolling")
    const posActualScroll = window.pageYOffset;

    console.log("posPreviaScroll:", posPreviaScroll);
    console.log("posActualScroll:", posActualScroll);

    if (posPreviaScroll > posActualScroll) {
      console.log("Scroll hacia arriba");
      navbar.classList.remove("escondido"); // Eliminar la clase "escondido"
    } else {
      console.log("Scroll hacia abajo");
      navbar.classList.add("escondido"); // Añadir la clase "escondido"
    }

    posPreviaScroll = posActualScroll;
  });
});
