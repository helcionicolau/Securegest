const express = require('express');
const router = express.Router();
const funcionarioSaidaController = require('../../../controllers/rh/employee_leaves/employeeLeaveController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de funcionários
router.post('/register', authMiddleware.authenticateUserMiddleware, funcionarioSaidaController.registerFuncionarioSaida);
router.get('/', authMiddleware.authenticateUserMiddleware, funcionarioSaidaController.getAllFuncionarioSaidas);
router.get('/total', authMiddleware.authenticateUserMiddleware, funcionarioSaidaController.getTotalFuncionarioSaidas);
router.get('/:funcionarioSaidaId', authMiddleware.authenticateUserMiddleware, funcionarioSaidaController.getFuncionarioSaidaById);
router.put('/:funcionarioSaidaId', authMiddleware.authenticateUserMiddleware, funcionarioSaidaController.updateFuncionarioSaida);
router.delete('/:funcionarioSaidaId', authMiddleware.authenticateUserMiddleware, funcionarioSaidaController.deleteFuncionarioSaida);

module.exports = router;

// Created by António Baptista #(24/08/2023)