const express = require('express');
const router = express.Router();
const zonaController = require('../../../controllers/business_diretion/zone/zoneController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de zonas
router.post('/register', authMiddleware.authenticateUserMiddleware, zonaController.registerZona);
router.get('/', authMiddleware.authenticateUserMiddleware, zonaController.getAllZonas);
router.get('/:zonaId', authMiddleware.authenticateUserMiddleware, zonaController.getZonaById);
router.put('/:zonaId', authMiddleware.authenticateUserMiddleware, zonaController.updateZona);
router.delete('/:zonaId', authMiddleware.authenticateUserMiddleware, zonaController.deleteZona);

module.exports = router;

// Created by António Baptista #(24/08/2023)