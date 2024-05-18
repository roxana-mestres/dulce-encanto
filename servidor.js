require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Reserva = require("./reservaModelo");

// Configurar servidor Express
const app = express();
const PORT = process.env.PORT || 3000;

// Permitir solicitudes desde el frontend en el puerto 5500
app.use(
  cors({
    origin: "*",
  })
);

// Conectar a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());

// Funciones de validación
function validarNombre(nombre) {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(nombre);
}

function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

function validarTelefono(telefono) {
  const regex = /^[0-9]{10}$/;
  return regex.test(telefono);
}

function validarPersonas(personas) {
  const regex = /^[1-9][0-9]*$/;
  return regex.test(personas);
}

// Definir una ruta POST para manejar las reservas
app.post("/reservas", (peticion, respuesta) => {
  const {
    nombre,
    correo,
    telefono,
    personas,
    horaSeleccionada,
    diaSeleccionado,
    fechaSeleccionada,
  } = peticion.body;

  // Validar los datos recibidos
  if (
    !validarNombre(nombre) ||
    !validarCorreo(correo) ||
    !validarTelefono(telefono) ||
    !validarPersonas(personas)
  ) {
    return respuesta.status(400).send("Datos inválidos");
  }

  // Crear una nueva instancia de la reserva con los datos proporcionados
  const nuevaReserva = new Reserva({
    nombre,
    correo,
    telefono,
    personas,
    horaSeleccionada,
    diaSeleccionado,
    fechaSeleccionada,
  });

  // Guardar la reserva en la base de datos
  nuevaReserva
    .save()
    .then(() => {
      console.log("Reserva guardada correctamente en la base de datos");
      respuesta.status(200).send("Reserva guardada correctamente");
    })
    .catch((error) => {
      console.error("Error al guardar la reserva:", error);
      respuesta.status(500).send("Error al guardar la reserva");
    });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
