const mongoose = require("mongoose");

const conductorSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    vehiculo: {
      type: String,
      required: true,
    },
    licencia: {
      type: String,
      required: true,
      unique: true,
    },
    entregasTotales: {
      type: Number,
      default: 0,
    },
    estatus: {
      type: String,
      enum: ["disponible", "en_ruta", "ocupado", "descanso"],
      default: "disponible",
    },
    calificacionPromedio: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    pedidos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pedido",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conductor", conductorSchema);
