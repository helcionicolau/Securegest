const express = require('express');
const router = express.Router();
const tarefaController = require('../../../controllers/general_direction/tasks/taskController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de tarefa
router.post('/register', authMiddleware.authenticateUserMiddleware, tarefaController.registerTarefa);
router.get('/', authMiddleware.authenticateUserMiddleware, tarefaController.getAllTarefas);
router.get('/:tarefaId', authMiddleware.authenticateUserMiddleware, tarefaController.getTarefaById);
router.get('/departamento/:departamentoId', authMiddleware.authenticateUserMiddleware, tarefaController.getTarefasByDepartamentoId);
router.get('/projeto/:projetoId', authMiddleware.authenticateUserMiddleware, tarefaController.getTarefasByProjetoId);
router.put('/:tarefaId', authMiddleware.authenticateUserMiddleware, tarefaController.updateTarefa);
router.delete('/:tarefaId', authMiddleware.authenticateUserMiddleware, tarefaController.deleteTarefa);

module.exports = router;

// Created by António Baptista #(24/08/2023)