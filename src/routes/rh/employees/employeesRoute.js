const express = require('express');
const router = express.Router();
const funcionarioController = require('../../../controllers/rh/employees/employeeController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de funcionários
router.post('/register', authMiddleware.authenticateUserMiddleware, funcionarioController.registerFuncionario);
router.get('/', authMiddleware.authenticateUserMiddleware, funcionarioController.getFuncionariosSeguranca);
router.get('/total', authMiddleware.authenticateUserMiddleware, funcionarioController.getTotalFuncionarios);
router.get('/totalPorData', authMiddleware.authenticateUserMiddleware, funcionarioController.getTotalFuncionariosPorData);
router.get('/:funcionarioId', authMiddleware.authenticateUserMiddleware, funcionarioController.getFuncionarioById);
router.put('/:funcionarioId', authMiddleware.authenticateUserMiddleware, funcionarioController.updateFuncionario);
router.delete('/:funcionarioId', authMiddleware.authenticateUserMiddleware, funcionarioController.deleteFuncionario);
router.get('/segurancas', authMiddleware.authenticateUserMiddleware, funcionarioController.getAllFuncionarios);

// Adicione a nova rota para obter funcionários por departamento
router.get('/byDepartamento/:departamentoId', authMiddleware.authenticateUserMiddleware, funcionarioController.getFuncionariosByDepartamento);
router.get('/byNmec/:n_mecId', authMiddleware.authenticateUserMiddleware, funcionarioController.getFuncionariosByN_MEC);


module.exports = router;

// Created by António Baptista #(24/08/2023)