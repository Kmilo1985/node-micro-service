const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreUsuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
