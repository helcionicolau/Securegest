const express = require('express');
const router = express.Router();
const postoController = require('../../../controllers/business_diretion/post/postController.js');
const authMiddleware = require('../../../middleware/authMiddleware.js');

// Rotas para o CRUD de posto
router.post('/register', authMiddleware.authenticateUserMiddleware, postoController.registerPosto);
router.get('/', authMiddleware.authenticateUserMiddleware, postoController.getAllPostos);
router.get('/segurancas', authMiddleware.authenticateUserMiddleware, postoController.getAllSegurancaNaoAdicionados);
router.get('/:postoId', authMiddleware.authenticateUserMiddleware, postoController.getPostoById);
router.get('/posicao/:posicaoId', authMiddleware.authenticateUserMiddleware, postoController.getPostosByPosicaoId);
router.put('/:postoId', authMiddleware.authenticateUserMiddleware, postoController.updatePosto);
router.delete('/:postoId', authMiddleware.authenticateUserMiddleware, postoController.deletePosto);

module.exports = router;