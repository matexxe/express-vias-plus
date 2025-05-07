const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");

// Crear un pedido
router.post("/", pedidoController.crearPedido);

// Obtener todos los pedidos
router.get("/", pedidoController.obtenerPedidos);

// Obtener un solo pedido por ID
router.get("/:id", pedidoController.obtenerPedido);

// Obtener pedidos por conductor (esta es la que te falta)
router.get(
  "/conductor/:conductorId",
  pedidoController.obtenerPedidosPorConductor
);

// Asignar un conductor a un pedido
router.post(
  "/:pedidoId/asignar-conductor/:conductorId",
  pedidoController.asignarConductor
);

// Actualizar un pedido
router.put("/:pedidoId", pedidoController.actualizarPedido);

// Eliminar un pedido
router.delete("/:pedidoId", pedidoController.eliminarPedido);

module.exports = router;
