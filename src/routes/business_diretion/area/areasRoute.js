const express = require('express');
const router = express.Router();
const areaController = require('../../../controllers/business_diretion/area/areaController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de áreas
router.post('/register', authMiddleware.authenticateUserMiddleware, areaController.registerArea);
router.get('/', authMiddleware.authenticateUserMiddleware, areaController.getAllAreas);
router.get('/:areaId', authMiddleware.authenticateUserMiddleware, areaController.getAreaById);
router.put('/:areaId', authMiddleware.authenticateUserMiddleware, areaController.updateArea);
router.delete('/:areaId', authMiddleware.authenticateUserMiddleware, areaController.deleteArea);

module.exports = router;

// Created by António Baptista #(24/08/2023)