const Pedido = require("../models/Pedidos");
const Cliente = require("../models/Cliente");
const Conductor = require("../models/Conductor");

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
  try {
    // Encontrar el cliente por su ID
    const cliente = await Cliente.findById(req.body.cliente_id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // Crear un nuevo pedido con los datos del cuerpo de la solicitud
    const nuevoPedido = new Pedido({
      ...req.body,
      telefono: cliente.telefono, // Copiar los datos del cliente al pedido
      direccion: cliente.direccion,
      email: cliente.email,
    });

    // Guardar el pedido
    await nuevoPedido.save();

    // Actualizar el array de pedidos del cliente
    cliente.pedidos.push(nuevoPedido._id);
    await cliente.save();

    // Realizar el "populate" de los campos relacionados
    await nuevoPedido.populate("cliente_id", "-pedidos -__v");
    await nuevoPedido.populate("conductor_id", "-pedidos -__v");

    // Enviar la respuesta con el pedido creado
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Asignar un conductor a un pedido
exports.asignarConductor = async (req, res) => {
  try {
    const { pedidoId, conductorId } = req.params;

    const pedido = await Pedido.findById(pedidoId);
    const conductor = await Conductor.findById(conductorId);

    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });
    if (!conductor)
      return res.status(404).json({ error: "Conductor no encontrado" });

    pedido.conductor_id = conductorId;
    await pedido.save();

    conductor.pedidos.push(pedidoId);
    await conductor.save();

    await pedido.populate("cliente_id", "-pedidos -__v");
    await pedido.populate("conductor_id", "-pedidos -__v");

    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar el pedido de un cliente
exports.actualizarPedido = async (req, res) => {
  try {
    const { pedidoId } = req.params;
    const datosActualizados = req.body;

    const pedido = await Pedido.findByIdAndUpdate(pedidoId, datosActualizados, {
      new: true,
      runValidators: true,
    })
      .populate("cliente_id", "-pedidos -__v")
      .populate("conductor_id", "-pedidos -__v");

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    // Si se actualiza el estatus a "entregado", actualizamos las entregas del conductor
    if (datosActualizados.estatus === "entregado" && pedido.conductor_id) {
      await Conductor.findByIdAndUpdate(pedido.conductor_id, {
        $inc: { entregasTotales: 1 },
      });
    }

    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un pedido por ID
exports.eliminarPedido = async (req, res) => {
  try {
    const { pedidoId } = req.params;

    // Buscar y eliminar el pedido por ID
    const pedido = await Pedido.findByIdAndDelete(pedidoId);
    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.status(200).json({ mensaje: "Pedido eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los pedidos
exports.obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("cliente_id", "-pedidos -__v")
      .populate("conductor_id", "-pedidos -__v");
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Obtener pedidos por conductor con su ID
exports.obtenerPedidosPorConductor = async (req, res) => {
  try {
    const { conductorId } = req.params;
    const pedidos = await Pedido.find({ conductor_id: conductorId })
      .populate("cliente_id", "-pedidos -__v")
      .populate("conductor_id", "-pedidos -__v");
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Obtener un solo pedido por ID
exports.obtenerPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate("cliente_id", "-pedidos -__v")
      .populate("conductor_id", "-pedidos -__v");

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
