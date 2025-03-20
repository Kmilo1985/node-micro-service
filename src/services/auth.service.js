const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const register = async (username, password, email) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, email });
    return user;
};

const login = async (username, password) => {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('Usuario no encontrado');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Contraseña incorrecta');

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

module.exports = { register, login };
