const express = require('express');
const app = express();
const sequelize = require('./src/config/db.config');
const taskRoutes = require('./src/routes/task.routes');

require('dotenv').config();
app.use(express.json());

app.use('/api/tasks', taskRoutes);

sequelize.sync()
    .then(() => console.log('Conexión con la base de datos establecida.'))
    .catch(err => console.error('Error al conectar con la base de datos:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
