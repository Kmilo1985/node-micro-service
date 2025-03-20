const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { nombre, nombreUsuario, contrasena } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const user = await User.create({
            nombre,
            nombreUsuario,
            contrasena: hashedPassword
        });

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario.', error });
    }
};

exports.login = async (req, res) => {
    const { nombreUsuario, contrasena } = req.body;

    try {
        const user = await User.findOne({ where: { nombreUsuario } });

        console.log('📌 Usuario encontrado:', user);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        console.log('📌 Contraseña almacenada en la base de datos:', user.contrasena);

        if (!user.contrasena) {
            return res.status(500).json({ message: 'El usuario no tiene contraseña registrada.' });
        }

       // Verificar la contraseña usando bcrypt
       const validPassword = await bcrypt.compare(contrasena, user.contrasena);

        
        if (!validPassword) {  
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        const token = jwt.sign(
            { id: user.id, nombreUsuario: user.nombreUsuario },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        console.log('📌 Token generado:', token);

        res.json({ message: 'Inicio de sesión exitoso.', token });

    } catch (error) {
        console.error('❌ Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión.', error });
    }
};
