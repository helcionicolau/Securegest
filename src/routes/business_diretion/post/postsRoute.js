const express = require('express');
const router = express.Router();
const postoController = require('../../../controllers/business_diretion/post/postController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de postos
router.post('/register', authMiddleware.authenticateUserMiddleware, postoController.registerPosto);
router.get('/', authMiddleware.authenticateUserMiddleware, postoController.getAllPostos);
router.get('/:postoId', authMiddleware.authenticateUserMiddleware, postoController.getPostoById);
router.put('/:postoId', authMiddleware.authenticateUserMiddleware, postoController.updatePosto);
router.delete('/:postoId', authMiddleware.authenticateUserMiddleware, postoController.deletePosto);

module.exports = router;

// Created by António Baptista #(24/08/2023)