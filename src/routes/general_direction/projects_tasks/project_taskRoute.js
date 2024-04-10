const express = require('express');
const router = express.Router();
const funcionarioTarefaController = require('../../../controllers/general_direction/employees_tasks/employeeTaskController');
const authMiddleware = require('../../../middleware/authMiddleware'); // Assuming authMiddleware exists

// Rotas para o CRUD de tarefas
router.post('/register', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.createFuncionarioTarefa);
router.get('/', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.getAllFuncionarioTarefas);
router.get('/:tarefaId', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.getFuncionarioTarefaById);
router.put('/:tarefaId', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.updateFuncionarioTarefa);
router.delete('/:tarefaId', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.deleteFuncionarioTarefa);

module.exports = router;
