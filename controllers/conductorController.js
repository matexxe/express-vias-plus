const Conductor = require("../models/Conductor"); // Importa el modelo Conductor desde el archivo ../Conductor

// Controlador para crear un nuevo conductor
exports.crearConductor = async (req, res) => {
  try {
    const nuevoConductor = new Conductor(req.body); // Crea una nueva instancia del modelo Conductor con los datos recibidos en 
    // el cuerpo de la solicitud (req.body)
    await nuevoConductor.save(); // Guarda el nuevo conductor en la base de datos
    res.status(201).json(nuevoConductor); // Responde con el conductor creado y un código de estado 201 (Created)
  } catch (error) {
    res.status(400).json({ error: error.message }); // Si hay un error, responde con un código 400 (Bad Request) y el mensaje
    //  de error
  }
};

// Controlador para obtener todos los conductores
exports.obtenerConductores = async (req, res) => {
  try {
    // Busca todos los conductores en la base de datos y popula (rellena) la referencia a los pedidos asociados
    const conductores = await Conductor.find().populate("pedidos");
    res.status(200).json(conductores); // Responde con la lista de conductores y un código de estado 200 (OK)
  } catch (error) {
    res.status(400).json({ error: error.message }); // Si hay un error, responde con un código 400 y el mensaje de error
  }
};

// Controlador para obtener un conductor específico por su ID
exports.obtenerConductor = async (req, res) => {
  try {
    // Busca un conductor por su ID y popula la referencia a los pedidos asociados
    const conductor = await Conductor.findById(req.params.id).populate(
      "pedidos"
    );
    if (!conductor) {
      return res.status(404).json({ error: "Conductor no encontrado" }); // Si no se encuentra el conductor, responde con un código 404 (Not Found)
    }
    res.status(200).json(conductor); // Responde con el conductor encontrado y un código 200
  } catch (error) {
    res.status(400).json({ error: error.message }); // Si hay un error, responde con un código 400 y el mensaje de error
  }
};

// Controlador para actualizar un conductor existente por su ID
exports.actualizarConductor = async (req, res) => {
  try {
    // Busca y actualiza el conductor por su ID con los datos recibidos en req.body
    // Opciones:
    // - new: true → Devuelve el conductor actualizado en lugar del original
    // - runValidators: true → Ejecuta las validaciones definidas en el modelo
    const conductor = await Conductor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!conductor) {
      return res.status(404).json({ error: "Conductor no encontrado" }); // Si no se encuentra el conductor, responde con un código 404
    }
    res.status(200).json(conductor); // Responde con el conductor actualizado y un código 200
  } catch (error) {
    res.status(400).json({ error: error.message }); // Si hay un error, responde con un código 400 y el mensaje de error
  }
};

// Controlador para actualizar solo el estatus de un conductor por su ID
exports.actualizarEstatusConductor = async (req, res) => {
  try {
    const { conductorId } = req.params; // Extrae el ID del conductor de los parámetros de la URL
    const { estatus } = req.body; // Extrae el nuevo estatus del cuerpo de la solicitud

    // Busca y actualiza solo el campo "estatus" del conductor
    const conductor = await Conductor.findByIdAndUpdate(
      conductorId,
      { estatus }, // Solo actualiza el campo estatus
      { new: true, runValidators: true } // Mismas opciones que en actualizarConductor
    );

    if (!conductor) {
      return res.status(404).json({ error: "Conductor no encontrado" }); // Si no se encuentra el conductor, responde con un código 404
    }

    res.status(200).json(conductor); // Responde con el conductor actualizado y un código 200
  } catch (error) {
    res.status(400).json({ error: error.message }); // Si hay un error, responde con un código 400 y el mensaje de error
  }
};

// Controlador para eliminar un conductor por su ID
exports.eliminarConductor = async (req, res) => {
  try {
    // Busca y elimina el conductor por su ID
    const conductor = await Conductor.findByIdAndDelete(req.params.id);
    if (!conductor) {
      return res.status(404).json({ error: "Conductor no encontrado" }); // Si no se encuentra el conductor, responde con un código 404
    }
    res.status(200).json({ message: "Conductor eliminado correctamente" }); // Responde con un mensaje de éxito y un código 200
  } catch (error) {
    res.status(400).json({ error: error.message }); // Si hay un error, responde con un código 400 y el mensaje de error
  }
};
