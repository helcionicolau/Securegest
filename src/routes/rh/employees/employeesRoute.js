const express = require('express');
const router = express.Router();
const funcionarioController = require('../../../controllers/rh/employees/employeeController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de funcionários
router.post('/register', authMiddleware.authenticateUserMiddleware, funcionarioController.registerFuncionario);
router.get('/', authMiddleware.authenticateUserMiddleware, funcionarioController.getAllFuncionarios);
router.get('/:funcionarioId', authMiddleware.authenticateUserMiddleware, funcionarioController.getFuncionarioById);
router.put('/:funcionarioId', authMiddleware.authenticateUserMiddleware, funcionarioController.updateFuncionario);
router.delete('/:funcionarioId', authMiddleware.authenticateUserMiddleware, funcionarioController.deleteFuncionario);

// Adicione a nova rota para obter funcionários por departamento
router.get('/departamento/:departamentoId', authMiddleware.authenticateUserMiddleware, funcionarioController.getFuncionariosByDepartamentoId);
router.get('/cargo/:cargoNome', authMiddleware.authenticateUserMiddleware, funcionarioController.getFuncionariosByCargo);


module.exports = router;

// Created by António Baptista #(24/08/2023)