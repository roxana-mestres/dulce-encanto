document.addEventListener("DOMContentLoaded", function () {
  const botonReservar = document.querySelector(".enviar");
  const horas = document.querySelectorAll(".hora");

  botonReservar.addEventListener("click", function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const personas = document.getElementById("personas").value;

    // Validar los campos
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
        console.log("Hora seleccionada:" + horaSeleccionada);
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
    console.log("Día seleccionado:", diaSeleccionado);
    console.log("Fecha seleccionada:", fechaSeleccionada);

    function validarNombre(nombre) {
      const regex = /^[a-zA-Z\s]+$/;
      return regex.test(nombre);
    }

    function validarCorreo(correo) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(correo);
    }

    function validarTelefono(telefono) {
      const regex = /^[0-9]{9}$/;
      return regex.test(telefono);
    }

    function validarPersonas(personas) {
      const regex = /^[1-9][0-9]*$/;
      return regex.test(personas);
    }

    // Llamar a una función para guardar los datos
    guardarReserva(
      nombre,
      correo,
      telefono,
      personas,
      horaSeleccionada,
      diaSeleccionado,
      fechaSeleccionada
    );

    // Restablecer el formulario después de enviar
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

// Función para guardar reserva
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

  fetch("http://localhost:3000/reservas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservaData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Reserva guardada correctamente en la base de datos");
        alert(`Su reserva para el día ${dia} ${fecha} a las ${hora} ha sido realizada con éxito`);
      } else {
        console.error("Error al guardar la reserva:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error al enviar la solicitud:", error);
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
    hora.textContent = `${
      hora.classList.contains("uno")
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
    hora.textContent = `${
      hora.classList.contains("uno")
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
  console.log(inicioSemana, finSemana);

  primerDiaSemanaActual = inicioSemana;
  ultimoDiaSemanaActual = finSemana;

  return [inicioSemana, finSemana];
}

// Función para formatear la fecha

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

//Función para cambiar de semana
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
  console.log("Clic en flecha");
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
    console.log(fecha, index);
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
    const diaTexto = diaElemento.textContent.trim(); // Obtener el texto del día sin espacios en blanco

    // Obtener el índice del día en el arreglo diasSemana
    const diaNumero = diasSemana.indexOf(diaTexto);
    // Guardar el índice + 1 (para que domingo sea 1 en lugar de 0)
    const diaSeleccionado = diaNumero !== -1 ? diaNumero + 1 : "";

    // Remover la clase "seleccionado" de todos los días
    document
      .querySelectorAll(".dia")
      .forEach((dia) => dia.classList.remove("seleccionado"));
    diaElemento.classList.add("seleccionado");

    // Guardar el número del día seleccionado en un atributo de datos
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

    // Llamar a sincronizarDiasSemana después de seleccionar una hora
    sincronizarDiasSemana(horaSeleccionada);
  });
});

// Flechas calendario responsive

const flechaIzq = document.querySelector(".flecha.izq");
const flechaDer = document.querySelector(".flecha.der");
const calendario = document.querySelector(".calendario");
let translateX = 0;

const actualizarTransformacion = () => {
  calendario.style.transform = `translateX(${translateX}px)`;
};

const handleClickFlechaDer = () => {
  console.log("Click en flecha derecha");
  translateX -= 275;
  actualizarTransformacion();
  if (translateX <= -275) {
    flechaDer.style.display = "none";
    flechaIzq.style.display = "block";
    flechaIzq.style.rotate = "180deg";
    flechaIzq.style.left = "280px";
    flechaIzq.style.top = "10%";
  }
};

const handleClickFlechaIzq = () => {
  console.log("Click en flecha izquierda");
  translateX += 275;
  actualizarTransformacion();
  if (translateX <= 275) {
    flechaIzq.style.display = "none";
    flechaDer.style.display = "block";
    flechaDer.style.right = "0px";
    flechaDer.style.top = "10%";
  }
};

// Verifica el ancho de la ventana antes de agregar los event listeners
if (window.innerWidth < 500) {
  flechaDer.style.display = "block";
  flechaDer.style.right = "0px";
  flechaDer.style.top = "57%";
  flechaDer.addEventListener("click", handleClickFlechaDer);
  flechaIzq.addEventListener("click", handleClickFlechaIzq);
}