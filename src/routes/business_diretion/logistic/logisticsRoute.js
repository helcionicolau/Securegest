const express = require('express');
const router = express.Router();
const logisticaController = require('../../../controllers/business_diretion/logistic/logisticController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de logística
router.post('/', authMiddleware.authenticateUserMiddleware, logisticaController.registerLogistica);
router.get('/', authMiddleware.authenticateUserMiddleware, logisticaController.getAllLogisticas);
router.get('/:logisticaId', authMiddleware.authenticateUserMiddleware, logisticaController.getLogisticaById);
router.put('/:logisticaId', authMiddleware.authenticateUserMiddleware, logisticaController.updateLogistica);
router.delete('/:logisticaId', authMiddleware.authenticateUserMiddleware, logisticaController.deleteLogistica);

module.exports = router;


// Created by António Baptista #(24/08/2023)