const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema(
  {
    cliente_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },
    conductor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conductor",
    },
    articulo: {
      type: String,
      required: true,
    },
    descripcionPedido: {
      type: String,
      trim: true,
    },
    fechaEntrega: {
      type: Date,
      required: true,
    },
    estatus: {
      type: String,
      enum: ["pendiente", "en_progreso", "entregado", "cancelado"],
      default: "pendiente",
    },
    calificacion: {
      type: Number,
      min: 1,
      max: 5,
    },
    telefono: {
      type: String,
    },
    direccion: {
      type: String,
    },
    email: {
      type: String,
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pedido", pedidoSchema);
