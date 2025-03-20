const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente',
  },
  userId: {  // Relación con el usuario que creó la tarea
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Task;
