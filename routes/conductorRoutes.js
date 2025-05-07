const express = require("express");
const router = express.Router();
const conductorController = require("../controllers/conductorController");

router.post("/", conductorController.crearConductor);
router.get("/", conductorController.obtenerConductores);
router.get("/:id", conductorController.obtenerConductor);
router.put("/:id", conductorController.actualizarConductor);
router.put(
  "/:conductorId/estatus",
  conductorController.actualizarEstatusConductor
);
router.delete("/:id", conductorController.eliminarConductor);

module.exports = router;
