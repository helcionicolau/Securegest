const express = require('express');
const router = express.Router();
const funcionarioTarefaController = require('../../../controllers/general_direction/employee_tasks/employeeTaskController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de atribuições de tarefas a funcionários
router.post('/register', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.registrarFuncionarioTarefa);
router.get('/', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.obterTodasFuncionarioTarefas);
router.get('/total', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.obterTotalFuncionarioTarefas);
router.get('/:funcionarioTarefaId', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.obterFuncionarioTarefaPorId);
router.put('/:funcionarioTarefaId', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.atualizarFuncionarioTarefa);
router.delete('/:funcionarioTarefaId', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.excluirFuncionarioTarefa);

// Rota para obter todas as atribuições de tarefas de um funcionário pelo ID do funcionário
router.get('/funcionario/:funcionarioId', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.obterTarefasDoFuncionarioPorId);

// Rota para obter todas as atribuições de tarefas pelo ID da tabela tarefa
router.get('/tarefa/:tarefaId', authMiddleware.authenticateUserMiddleware, funcionarioTarefaController.obterTodasFuncionarioTarefasPorIdDaTarefa);

module.exports = router;

// Created by António Baptista #(24/08/2023)