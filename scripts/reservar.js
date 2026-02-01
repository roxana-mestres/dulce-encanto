document.addEventListener("DOMContentLoaded", function () {
  const botonReservar = document.querySelector(".enviar");
  const horas = document.querySelectorAll(".hora");

  botonReservar.addEventListener("click", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const personas = document.getElementById("personas").value;

    let errores = [];

    if (!validarNombre(nombre)) {
      errores.push(
        "El nombre no es válido. Solo se permiten letras y espacios."
      );
    }
    if (!validarCorreo(correo)) {
      errores.push(
        "El correo no es válido. Debe seguir el formato ejemplo@dominio.com."
      );
    }
    if (!validarTelefono(telefono)) {
      errores.push("El teléfono no es válido. Debe contener 9 dígitos.");
    }
    if (!validarPersonas(personas)) {
      errores.push(
        "El número de personas no es válido. Debe ser un número positivo."
      );
    }

    if (errores.length > 0) {
      alert("Errores:\n" + errores.join("\n"));
      return;
    }

    // Obtener la hora seleccionada
    let horaSeleccionada;
    horas.forEach((hora) => {
      if (hora.classList.contains("seleccionada")) {
        horaSeleccionada = hora.textContent;
      }
    });

    // Obtener el día seleccionado
    const diaSeleccionadoElement = document.querySelector(".dia.seleccionado");
    const diaSeleccionado = diaSeleccionadoElement
      ? diaSeleccionadoElement.textContent
      : "";
    const fechaSeleccionadaElement = diaSeleccionadoElement
      ? diaSeleccionadoElement.nextElementSibling
      : null;
    const fechaSeleccionada = fechaSeleccionadaElement
      ? fechaSeleccionadaElement.textContent
      : "";

    if (!diaSeleccionado || !fechaSeleccionada) {
      alert("Por favor, selecciona un día.");
      return;
    }

    function validarNombre(nombre) {
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
      return regex.test(nombre);
    }

    function validarCorreo(correo) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(correo);
    }

    function validarTelefono(telefono) {
      const regex = /^(\+\d{1,3}\s?)?(\d{9,15})$/;
      return regex.test(telefono);
    }

    function validarPersonas(personas) {
      const regex = /^[1-9][0-9]*$/;
      return regex.test(personas);
    }

    guardarReserva(
      nombre,
      correo,
      telefono,
      personas,
      horaSeleccionada,
      diaSeleccionado,
      fechaSeleccionada
    );

    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("personas").value = "";
    horas.forEach((hora) => hora.classList.remove("seleccionada"));
    document
      .querySelectorAll(".dia")
      .forEach((dia) => dia.classList.remove("seleccionado"));
  });
});

function guardarReserva(nombre, correo, telefono, personas, hora, dia, fecha) {
  const reservaData = {
    nombre: nombre,
    correo: correo,
    telefono: telefono,
    personas: personas,
    horaSeleccionada: hora,
    diaSeleccionado: dia,
    fechaSeleccionada: fecha,
  };

  fetch("https://roxana-mestres.com/dulce-encanto/reservas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservaData),
  })
    .then(async (respuesta) => {
      try {
        if (respuesta.ok) {
          return await respuesta.json();
        } else {
          throw new Error("Error al guardar la reserva");
        }
      } catch (error) {
        throw new Error(
          `Error al analizar la respuesta como JSON: ${error.message}`
        );
      }
    })
    .then((data) => {
      alert("Reserva guardada correctamente");
    })
    .catch((error) => {
      alert(`Error al enviar la solicitud: ${error.message}`);
    });
}

/* HORAS */

const botonAM = document.querySelector(".casilla.am");
const botonPM = document.querySelector(".casilla.pm");
const botones = document.querySelectorAll(".casilla");
const horas = document.querySelectorAll(".hora");

botonAM.addEventListener("click", () => {
  botones.forEach((boton) => boton.classList.remove("activo"));
  botonAM.classList.add("activo");
});

botonPM.addEventListener("click", () => {
  botones.forEach((boton) => boton.classList.remove("activo"));
  botonPM.classList.add("activo");
});

botonAM.addEventListener("click", () => {
  const horas = document.querySelectorAll(".hora");
  horas.forEach((hora) => {
    hora.textContent = `${hora.classList.contains("uno")
        ? "9:00"
        : hora.classList.contains("dos")
          ? "10:00"
          : "11:00"
      } a.m.`;
    hora.classList.remove("pm");
    hora.classList.add("am");
  });
});

botonPM.addEventListener("click", () => {
  const horas = document.querySelectorAll(".hora");
  horas.forEach((hora) => {
    hora.textContent = `${hora.classList.contains("uno")
        ? "17:00"
        : hora.classList.contains("dos")
          ? "18:00"
          : "19:00"
      } p.m.`;
    hora.classList.remove("am");
    hora.classList.add("pm");
  });
});

/* FECHA - SEMANA */
let primerDiaSemanaActual;
let ultimoDiaSemanaActual;

function obtenerInicioFinSemana(d) {
  const inicioSemana = new Date(d);
  const finSemana = new Date(d);

  // Retroceder al último lunes
  inicioSemana.setDate(
    inicioSemana.getDate() - ((inicioSemana.getDay() + 6) % 7)
  );
  // Sumar 6 días para obtener el final de la semana
  finSemana.setDate(inicioSemana.getDate() + 6);

  if (
    inicioSemana.getMonth() !==
    new Date(finSemana.getFullYear(), finSemana.getMonth() + 1, 0).getMonth()
  ) {
    finSemana.setMonth(inicioSemana.getMonth());
    finSemana.setDate(inicioSemana.getDate() + 6);
  }

  primerDiaSemanaActual = inicioSemana;
  ultimoDiaSemanaActual = finSemana;

  return [inicioSemana, finSemana];
}


function formatearFecha(fecha) {
  const diasSemana = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const meses = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];

  const diaSemana = diasSemana[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();

  return `${diaSemana} ${dia} DE ${mes}, ${año}`;
}

let fechaActual = new Date();

const flechaAnterior = document.querySelector(".flecha.bajar");
const flechaSiguiente = document.querySelector(".flecha.subir");

flechaAnterior.addEventListener("click", function () {
  cambiarSemana("anterior");
});

flechaSiguiente.addEventListener("click", function () {
  cambiarSemana("siguiente");
});

//Función para cambiar de semana
function cambiarSemana(direccion) {
  if (direccion === "anterior") {
    fechaActual.setDate(fechaActual.getDate() + 7);
  } else if (direccion === "siguiente") {
    fechaActual.setDate(fechaActual.getDate() - 7);
  }
  const [inicioSemana, finSemana] = obtenerInicioFinSemana(fechaActual);
  const textoFecha = `${formatearFecha(inicioSemana)} - ${formatearFecha(
    finSemana
  )}`;
  document.getElementById("fecha").textContent = textoFecha;
  document.querySelector(".semana p").textContent = textoFecha;
  sincronizarFechas();
  sincronizarDiasSemana();
}

//Función para mostrar la fecha actual al cargar la página

window.onload = function () {
  const fechaActual = new Date();
  const [inicioSemana, finSemana] = obtenerInicioFinSemana(fechaActual);
  const textoInicio = formatearFecha(inicioSemana);
  const textoFin = formatearFecha(finSemana);
  const textoFecha = `${textoInicio} - ${textoFin}`;
  document.getElementById("fecha").textContent = textoFecha;
  document.querySelector(".semana p").textContent = textoFecha;
  sincronizarFechas();
};

//Función para sincronizar las fechas con los días de la semana
function sincronizarFechas() {
  const fechas = document.querySelectorAll(".fecha");
  fechas.forEach((fecha, index) => {
    const dia = new Date(primerDiaSemanaActual);
    dia.setDate(primerDiaSemanaActual.getDate() + index);
    const diaSemana = dia.getDate().toString().padStart(2, "0");
    const mes = (dia.getMonth() + 1).toString().padStart(2, "0");
    fecha.textContent = `${diaSemana}/${mes}`;
  });
}

//Función para sincronizar los días de la semana y seleccionar el día correspondiente según la hora seleccionada
function sincronizarDiasSemana(horaSeleccionada) {
  const diasSemana = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const horasSeleccionadas = document.querySelectorAll(".hora.seleccionada");

  horasSeleccionadas.forEach((horaSeleccionada) => {
    const diaElemento = horaSeleccionada
      .closest(".contenedor-dia-hora")
      .querySelector(".dia");
    const diaTexto = diaElemento.textContent.trim();

    const diaNumero = diasSemana.indexOf(diaTexto);

    const diaSeleccionado = diaNumero !== -1 ? diaNumero + 1 : "";

    document
      .querySelectorAll(".dia")
      .forEach((dia) => dia.classList.remove("seleccionado"));
    diaElemento.classList.add("seleccionado");

    diaElemento.dataset.diaNumero = diaSeleccionado;
  });
}

//Seleccionar horas

const horasReserva = document.querySelectorAll(".hora");

horasReserva.forEach((hora) => {
  hora.addEventListener("click", () => {
    horasReserva.forEach((h) => h.classList.remove("seleccionada"));
    hora.classList.add("seleccionada");

    // Obtener la hora seleccionada
    const horaSeleccionada = hora.textContent;

    sincronizarDiasSemana(horaSeleccionada);
  });
});
