require('dotenv').config();  // Asegúrate de que esta línea está al principio

const express = require('express');
const sequelize = require('./config/db.config');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;  // Usa el puerto especificado en .env o 3000 por defecto

sequelize.authenticate()  // Cambié .sync() a .authenticate() para probar la conexión
  .then(() => {
    console.log('Conexión con la base de datos establecida correctamente.');
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  })
  .catch(err => console.error('Error al conectar con la base de datos:', err));
