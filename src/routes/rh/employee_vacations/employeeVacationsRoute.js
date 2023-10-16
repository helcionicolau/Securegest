const express = require('express');
const router = express.Router();
const funcionarioFeriasController = require('../../../controllers/rh/employee_vacations/employeeVacationController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rota para registrar uma nova solicitação de férias
router.post('/register', authMiddleware.authenticateUserMiddleware, funcionarioFeriasController.registrarFerias);

// Rota para listar todas as solicitações de férias
router.get('/', authMiddleware.authenticateUserMiddleware, funcionarioFeriasController.listarTodasFerias);

// Rota para aprovar ou rejeitar uma solicitação de férias
router.put('/:feriasId', authMiddleware.authenticateUserMiddleware, funcionarioFeriasController.aprovarRejeitarFerias);

// Rota para atualizar uma solicitação de férias
router.put('/:feriasId', authMiddleware.authenticateUserMiddleware, funcionarioFeriasController.updateFuncionarioFerias);

// Rota para consultar o saldo atual de férias de um funcionário
router.get('/balance/:funcionarioId', authMiddleware.authenticateUserMiddleware, funcionarioFeriasController.consultarSaldoFerias);

// Rota para consultar detalhes de uma solicitação de férias por ID
router.get('/:feriasId', authMiddleware.authenticateUserMiddleware, funcionarioFeriasController.getFuncionarioFeriasById);

// Rota para excluír féria por ID
router.delete('/:feriasId', authMiddleware.authenticateUserMiddleware, funcionarioFeriasController.excluirFerias);

module.exports = router;

// Created by António Baptista #(24/08/2023)