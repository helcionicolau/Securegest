const express = require('express');
const router = express.Router();
const departamentoController = require('../../../controllers/rh/departments/departmentController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de departamentos
router.post('/register', authMiddleware.authenticateUserMiddleware, departamentoController.registerDepartamento);
router.get('/', authMiddleware.authenticateUserMiddleware, departamentoController.getAllDepartamentos);
router.get('/total', authMiddleware.authenticateUserMiddleware, departamentoController.getTotalDepartamentos);
router.get('/:departamentoId', authMiddleware.authenticateUserMiddleware, departamentoController.getDepartamentoById);
router.put('/:departamentoId', authMiddleware.authenticateUserMiddleware, departamentoController.updateDepartamento);
router.delete('/:departamentoId', authMiddleware.authenticateUserMiddleware, departamentoController.deleteDepartamento);

module.exports = router;

// Created by António Baptista #(24/08/2023)
