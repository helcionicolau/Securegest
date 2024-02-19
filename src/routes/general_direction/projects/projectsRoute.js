const express = require('express');
const router = express.Router();
const projetoController = require('../../../controllers/general_direction/projects/projectController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de projeto
router.post('/', authMiddleware.authenticateUserMiddleware, projetoController.registerProjeto);
router.get('/', authMiddleware.authenticateUserMiddleware, projetoController.getAllProjetos);
router.get('/:projetoId', authMiddleware.authenticateUserMiddleware, projetoController.getProjetoById);
router.get('/posicao/:posicaoId', authMiddleware.authenticateUserMiddleware, projetoController.getProjetosByPosicaoId);
router.put('/:projetoId', authMiddleware.authenticateUserMiddleware, projetoController.updateProjeto);
router.delete('/:projetoId', authMiddleware.authenticateUserMiddleware, projetoController.deleteProjeto);

module.exports = router;