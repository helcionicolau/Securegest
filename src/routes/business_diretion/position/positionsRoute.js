const express = require('express');
const router = express.Router();
const positionController = require('../../../controllers/business_diretion/position/positionController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware');

// Rotas para o CRUD de posições
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    positionController.registerPosicao
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    positionController.getAllPosicoes
);
router.get('/:posicaoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    positionController.getPosicaoById
);
router.put('/:posicaoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    positionController.updatePosicao
);
router.delete('/:posicaoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    positionController.deletePosicao
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
