const Task = require('../models/task.model');

exports.createTask = async (req, res) => {
  try {
    const { titulo, descripcion,userId } = req.body;
    // const userId = req.body.userId; // Obtenemos el userId del token JWT que fue verificado por el middleware
console.log(req, 'req')
    if (!userId) {
        return res.status(400).json({ message: "El userId es requerido." });
    }

    const newTask = await Task.create({ 
        userId,
        titulo,
        descripcion
    });

    res.status(201).json(newTask);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

exports.getAllTasks = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { userId: req.body.userId } });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, estado } = req.body;

  try {
    const task = await Task.findByPk(id);

    if (!task || task.userId !== req.user.userId) {
      return res.status(404).json({ message: 'Tarea no encontrada o no autorizada.' });
    }

    task.titulo = titulo ?? task.titulo;
    task.descripcion = descripcion ?? task.descripcion;
    task.estado = estado ?? task.estado;

    await task.save();
    res.json({ message: 'Tarea actualizada con éxito', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);

    if (!task || task.userId !== req.user.userId) {
      return res.status(404).json({ message: 'Tarea no encontrada o no autorizada.' });
    }

    await task.destroy();
    res.json({ message: 'Tarea eliminada con éxito.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
