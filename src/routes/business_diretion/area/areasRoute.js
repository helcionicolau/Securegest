const express = require('express');
const router = express.Router();
const areaController = require('../../../controllers/business_diretion/area/areaController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware');

// Rotas para o CRUD de áreas
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    areaController.registerArea
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    areaController.getAllAreas
);
router.get('/:areaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    areaController.getAreaById
);
router.put('/:areaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    areaController.updateArea
);
router.delete('/:areaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    areaController.deleteArea
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
