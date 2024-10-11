const express = require('express');
const router = express.Router();
const zonaController = require('../../../controllers/business_diretion/zone/zoneController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de zonas
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    zonaController.registerZona
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    zonaController.getAllZonas
);
router.get('/:zonaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    zonaController.getZonaById
);
router.put('/:zonaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    zonaController.updateZona
);
router.delete('/:zonaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    zonaController.deleteZona
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
