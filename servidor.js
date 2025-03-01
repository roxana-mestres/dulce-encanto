require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Reserva = require("./reservaModelo");
const path = require("path");

// Configurar servidor Express
const app = express();
const PORT = process.env.PORT || 3004;

app.use(
  cors({
    origin: "https://proyectos-roxana-mestres.xyz/",
  })
);

app.use((peticion, respuesta, next) => {
  console.log("Cuerpo del mensaje recibido:");
  console.log(peticion.body);
  next();
});

// Conectar a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());

// Ruta para archivos HTML en la carpeta 'secciones'
app.use(express.static(path.join(__dirname, "secciones")));

app.use("/estilos", express.static(path.join(__dirname, "estilos")));

app.use("/scripts", express.static(path.join(__dirname, "scripts")));

app.use("/imagenes", express.static(path.join(__dirname, "imagenes")));

// Funciones de validación
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
      respuesta.status(200).json({respuesta: "Reserva guardada correctamente" });;
    })
    .catch((error) => {
      console.error("Error al guardar la reserva:", error);
      respuesta.status(500).json({ error: "Error al guardar la reserva" });;
    });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
