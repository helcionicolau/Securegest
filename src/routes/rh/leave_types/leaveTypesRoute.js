const express = require('express');
const router = express.Router();
const tipoSaidaController = require('../../../controllers/rh/leave_types/leaveTypeController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de tipos de saída
router.post('/register', authMiddleware.authenticateUserMiddleware, tipoSaidaController.registerTipoSaida);
router.get('/', authMiddleware.authenticateUserMiddleware, tipoSaidaController.getAllTipoSaidas);
router.get('/total', authMiddleware.authenticateUserMiddleware, tipoSaidaController.getTotalTipoSaidas);
router.get('/:tipoSaidaId', authMiddleware.authenticateUserMiddleware, tipoSaidaController.getTipoSaidaById);
router.put('/:tipoSaidaId', authMiddleware.authenticateUserMiddleware, tipoSaidaController.updateTipoSaida);
router.delete('/:tipoSaidaId', authMiddleware.authenticateUserMiddleware, tipoSaidaController.deleteTipoSaida);

module.exports = router;

// Created by António Baptista #(24/08/2023)