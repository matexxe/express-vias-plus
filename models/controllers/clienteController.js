const Pedido = require("../Pedidos");
const Cliente = require("../Cliente");
const mongoose = require("mongoose");


// Crear un nuevo cliente
exports.crearCliente = async (req, res) => {
  try {
    // Crear una nueva instancia del cliente usando los datos del cuerpo de la solicitud
    const nuevoCliente = new Cliente(req.body);

    // Guardar el cliente en la base de datos
    const clienteGuardado = await nuevoCliente.save();

    // Enviar una respuesta con el cliente guardado y el código de estado 201 (Creado)
    res.status(201).json(clienteGuardado);
  } catch (error) {
    // Manejo de errores en caso de que ocurra algún problema
    console.error("Error al crear cliente:", error);
    res.status(500).json({ error: "Error al crear el cliente" });
  }
};

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find(); // Obtener todos los clientes de la base de datos
    res.status(200).json(clientes); // Enviar los clientes como respuesta
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

// Obtener un cliente por su ID
exports.obtenerCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id); // Buscar cliente por ID
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.status(200).json(cliente); // Enviar el cliente encontrado como respuesta
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({ error: "Error al obtener cliente" });
  }
};

// Actualizar un cliente por su ID
exports.actualizarCliente = async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Para que devuelva el cliente actualizado
    );
    if (!clienteActualizado) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.status(200).json(clienteActualizado); // Enviar cliente actualizado
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error al actualizar cliente" });
  }
};
// Eliminar cliente y sus pedidos asociados
exports.eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Eliminar todos los pedidos asociados al cliente
    await Pedido.deleteMany({ cliente_id: id });

    // 2. Eliminar el cliente
    const clienteEliminado = await Cliente.findByIdAndDelete(id);

    if (!clienteEliminado) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.status(200).json({
      message: "Cliente y pedidos asociados eliminados correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: "Error al eliminar cliente y sus pedidos" });
  }
};
