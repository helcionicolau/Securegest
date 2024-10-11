const express = require('express');
const router = express.Router();
const sectorController = require('../../../controllers/business_diretion/sector/sectorController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de setores
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    sectorController.registerSector
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    sectorController.getAllSectors
);
router.get('/:sectorId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    sectorController.getSectorById
);
router.put('/:sectorId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    sectorController.updateSector
);
router.delete('/:sectorId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    sectorController.deleteSector
);

// Exemplo de rota adicional (filtrar setores por zona)
router.get('/by-zona/:zonaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    sectorController.getSectorsByZonaId
);

module.exports = router;

// Created by Bard (2024-08-19) based on António Baptista's work (24/08/2023)
