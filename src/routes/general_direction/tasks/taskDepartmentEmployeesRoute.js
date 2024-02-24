const express = require('express');
const router = express.Router();
const tarefaDepartamentoFuncionarioController = require('../../../controllers/general_direction/tasks/taskDepartmentEmployeeController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de tarefas do departamento do funcionário
router.post('/register', authMiddleware.authenticateUserMiddleware, tarefaDepartamentoFuncionarioController.registerTarefaDepartamentoFuncionario);
router.get('/', authMiddleware.authenticateUserMiddleware, tarefaDepartamentoFuncionarioController.getAllTarefasDepartamentoFuncionario);
router.get('/:tarefaDepartamentoFuncionarioId', authMiddleware.authenticateUserMiddleware, tarefaDepartamentoFuncionarioController.getTarefaDepartamentoFuncionarioById);
router.get('/:tarefaId/funcionarios', authMiddleware.authenticateUserMiddleware, tarefaDepartamentoFuncionarioController.getFuncionariosPorDepartamentoDaTarefa); // Rota atualizada
router.get('/tarefa/:tarefaId', authMiddleware.authenticateUserMiddleware, tarefaDepartamentoFuncionarioController.getTarefasByTarefaId);
router.get('/funcionario/:funcionarioId', authMiddleware.authenticateUserMiddleware, tarefaDepartamentoFuncionarioController.getTarefasByFuncionarioId);
router.put('/:tarefaDepartamentoFuncionarioId', authMiddleware.authenticateUserMiddleware, tarefaDepartamentoFuncionarioController.updateTarefaDepartamentoFuncionario);
router.delete('/:tarefaDepartamentoFuncionarioId', authMiddleware.authenticateUserMiddleware, tarefaDepartamentoFuncionarioController.deleteTarefaDepartamentoFuncionario);

module.exports = router;