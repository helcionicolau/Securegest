const express = require('express');
const router = express.Router();
const postoController = require('../../../controllers/business_diretion/post/postController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware');

// Rotas para o CRUD de posto
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    postoController.createPosto
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    postoController.getAllPostos
);
router.get('/:postoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    postoController.getPostoById
);
router.get('/posicao/:posicaoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    postoController.getPostosByPosicaoId
);
router.put('/:postoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    postoController.updatePosto
);
router.delete('/:postoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    postoController.deletePosto
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
