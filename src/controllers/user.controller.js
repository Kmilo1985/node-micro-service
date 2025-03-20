const { register, login } = require('../services/auth.service');
const User = require('../models/user.model');

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await register(username, password, email);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await login(username, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser };
