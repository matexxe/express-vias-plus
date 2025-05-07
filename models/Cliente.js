const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Cliente", clienteSchema);
