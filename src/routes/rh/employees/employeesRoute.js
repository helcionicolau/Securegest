const express = require('express');
const router = express.Router();
const funcionarioController = require('../../../controllers/rh/employees/employeeController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware');

// Rotas para o CRUD de funcionários
router.post('/register', authMiddleware.authenticateUserMiddleware, accessMiddleware('add'), funcionarioController.registerFuncionario);
router.get('/', authMiddleware.authenticateUserMiddleware, accessMiddleware('view'), funcionarioController.getAllFuncionarios);
router.get('/:funcionarioId', authMiddleware.authenticateUserMiddleware, accessMiddleware('view'), funcionarioController.getFuncionarioById);
router.put('/:funcionarioId', authMiddleware.authenticateUserMiddleware, accessMiddleware('update'), funcionarioController.updateFuncionario);
router.delete('/:funcionarioId', authMiddleware.authenticateUserMiddleware, accessMiddleware('delete'), funcionarioController.deleteFuncionario);

// Adicione a nova rota para obter funcionários por departamento
router.get('/departamento/:departamentoId', authMiddleware.authenticateUserMiddleware, accessMiddleware('view'), funcionarioController.getFuncionariosByDepartamentoId);

// Nova rota para obter funcionários por cargo
router.get('/cargo/:cargo', authMiddleware.authenticateUserMiddleware, accessMiddleware('view'), funcionarioController.getFuncionariosByCargo);

module.exports = router;

// Created by António Baptista #(24/08/2023)
