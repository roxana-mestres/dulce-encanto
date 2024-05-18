document.addEventListener("DOMContentLoaded", function() {
    const flechas = document.querySelectorAll(".flecha");

    flechas.forEach(flecha => {
        flecha.addEventListener("click", function() {
            const pestanaActiva = document.querySelector(".contenedor-pestana.activa");
            const pestanas = document.querySelectorAll(".contenedor-pestana");
            let indicePestanaActiva;

            pestanas.forEach((pestana, index) => {
                if (pestana === pestanaActiva) {
                    indicePestanaActiva = index;
                }
            });

            let indiceSiguientePestana;

            if (flecha.classList.contains("der")) {
                indiceSiguientePestana = (indicePestanaActiva + 1) % pestanas.length;
            } else if (flecha.classList.contains("izq")) {
                indiceSiguientePestana = (indicePestanaActiva - 1 + pestanas.length) % pestanas.length;
            }

            pestanas.forEach(pestana => {
                pestana.classList.remove("activa");
            });

            pestanas[indiceSiguientePestana].classList.add("activa");

            // Cambio de color
            switch (indiceSiguientePestana) {
                case 0: // arandanos
                    document.body.style.backgroundColor = "#dcd9ff";
                    document.body.style.color = "#8c0444";
                    document.querySelectorAll(".boton").forEach(button => {
                        button.style.backgroundColor = "#8c0444";
                        button.style.color = "#dcd9ff";
                    });
                    break;
                case 1: // frambuesas
                    document.body.style.backgroundColor = "#FFCCD5";
                    document.body.style.color = "#8c0444";
                    document.querySelectorAll(".boton").forEach(button => {
                        button.style.backgroundColor = "#8c0444";
                        button.style.color = "#FFCCD5";
                    });
                    break;
                case 2: // maracuya
                    document.body.style.backgroundColor = "#FFD3D8";
                    document.body.style.color = "#CE5AD5";
                    document.querySelectorAll(".boton").forEach(button => {
                        button.style.backgroundColor = "#CE5AD5";
                        button.style.color = "#FFD3D8";
                    });
                    break;
                case 3: // fresas
                    document.body.style.backgroundColor = "#F9BCAA";
                    document.body.style.color = "#8C0444";
                    document.querySelectorAll(".boton").forEach(button => {
                        button.style.backgroundColor = "#8C0444";
                        button.style.color = "#F9BCAA";
                    });
                    break;
                case 4: // mango
                    document.body.style.backgroundColor = "#FFF2B2";
                    document.body.style.color = "#6E8B19";
                    document.querySelectorAll(".boton").forEach(button => {
                        button.style.backgroundColor = "#6E8B19";
                        button.style.color = "#FFF2B2";
                    });
                    break;
                default:
                    break;
            }
        });
    });
});
