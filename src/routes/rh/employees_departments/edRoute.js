const express = require('express');
const router = express.Router();
const funcionarioDepartamentoController = require('../../../controllers/rh/employees_departments/edController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de associações funcionário-departamento
router.post('/register', authMiddleware.authenticateUserMiddleware, funcionarioDepartamentoController.registerFuncionarioDepartamento);
router.get('/', authMiddleware.authenticateUserMiddleware, funcionarioDepartamentoController.getAllFuncionariosDepartamentos);
router.get('/employee/:funcionarioId', authMiddleware.authenticateUserMiddleware, funcionarioDepartamentoController.getAssociationsByFuncionarioId);
router.get('/department/:departamentoId', authMiddleware.authenticateUserMiddleware, funcionarioDepartamentoController.getAssociationsByDepartamentoId);
router.get('/:funcionarioDepartamentoId', authMiddleware.authenticateUserMiddleware, funcionarioDepartamentoController.getFuncionarioDepartamentoById);
router.put('/:funcionarioDepartamentoId', authMiddleware.authenticateUserMiddleware, funcionarioDepartamentoController.updateFuncionarioDepartamento);
router.delete('/:funcionarioDepartamentoId', authMiddleware.authenticateUserMiddleware, funcionarioDepartamentoController.deleteFuncionarioDepartamento);

module.exports = router;

// Created by António Baptista #(24/08/2023)