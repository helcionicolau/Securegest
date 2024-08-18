const express = require('express');
const router = express.Router();
const sectorController = require('../../../controllers/business_diretion/sector/sectorController');

// Rotas para o CRUD de setores
router.post('/register', authMiddleware.authenticateUserMiddleware, sectorController.registerSector);
router.get('/', authMiddleware.authenticateUserMiddleware, sectorController.getAllSectors);
router.get('/:sectorId', authMiddleware.authenticateUserMiddleware, sectorController.getSectorById);
router.put('/:sectorId', authMiddleware.authenticateUserMiddleware, sectorController.updateSector);
router.delete('/:sectorId', authMiddleware.authenticateUserMiddleware, sectorController.deleteSector);

// Exemplo de rota adicional (filtrar setores por zona)
router.get('/by-zona/:zonaId', authMiddleware.authenticateUserMiddleware, sectorController.getSectorsByZonaId);

module.exports = router;

// Created by Bard (2024-08-19) based on António Baptista's work (24/08/2023)