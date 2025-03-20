const express = require('express');
const sequelize = require('./config/db.config');
const userRoutes = require('./routes/user.routes');
const User = require('./models/user.model'); // Asegúrate que sea la ruta correcta a tu modelo de usuario
const bcrypt = require('bcrypt'); // Asegúrate de tener bcrypt instalado con: npm install bcrypt

require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

console.log('Secreto JWT:', process.env.JWT_SECRET);

// Sincronizar la base de datos
sequelize.sync({ alter: true })  // Usa alter para modificar la tabla existente si el modelo cambia, pero sin borrarla
  .then(() => {
    console.log('✅ Conexión con la base de datos establecida correctamente.');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
  })
  .catch(err => console.error('❌ Error al conectar con la base de datos:', err));

  const createAdminUser = async () => {
    try {
        const existingUser = await User.findOne({ where: { nombreUsuario: 'admin' } });

        if (!existingUser) {
            // Generar un hash de la contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('mi_super_secreto_ultra_seguro_1234', salt); // Encripta la contraseña

            await User.create({
                nombre: 'Administrador',
                nombreUsuario: 'admin',
                contrasena: hashedPassword // Guarda la contraseña cifrada en la base de datos
            });

            console.log('✅ Usuario administrador creado exitosamente.');
        } else {
            console.log('⚠️ El usuario administrador ya existe.');
        }
    } catch (error) {
        console.error('❌ Error creando el usuario administrador:', error);
    }
};

// Llamar a la función al iniciar la aplicación
createAdminUser();
