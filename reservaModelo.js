const mongoose = require("mongoose");

// Esquema para la reserva
const reservaSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    telefono: String,
    personas: Number,
    horaSeleccionada: String,
    diaSeleccionado: String,
    fechaSeleccionada: String,
  });
  
  // Modelo basado en el esquema
  const Reserva = mongoose.model("Reserva", reservaSchema);

  module.exports = Reserva;