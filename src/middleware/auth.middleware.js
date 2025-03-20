const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware');

// Registro de usuario
router.post('/register', userController.register);

// Inicio de sesión
router.post('/login', userController.login);

// Ruta protegida de ejemplo
router.get('/profile', verifyToken, (req, res) => {
    res.json({ message: 'Acceso autorizado.', user: req.user });
});

module.exports = router;
