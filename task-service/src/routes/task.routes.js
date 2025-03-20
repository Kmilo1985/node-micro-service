const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const verifyToken = require('../middleware/auth.middleware');

// Rutas protegidas
router.post('/', verifyToken, taskController.createTask);
router.get('/', verifyToken, taskController.getAllTasks);
router.get('/:id', verifyToken, taskController.getAllTasks);
router.put('/:id', verifyToken, taskController.updateTask);
router.delete('/:id', verifyToken, taskController.deleteTask);

module.exports = router;
