const express = require('express');
const router = express.Router();
const projetoController = require('../../../controllers/general_direction/projects/projectController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de projetos
router.post('/register', authMiddleware.authenticateUserMiddleware, projetoController.createProjeto);
router.get('/', authMiddleware.authenticateUserMiddleware, projetoController.getAllProjetos);
router.get('/:projetoId', authMiddleware.authenticateUserMiddleware, projetoController.getProjetoById);
router.put('/:projetoId', authMiddleware.authenticateUserMiddleware, projetoController.updateProjeto);
router.delete('/:projetoId', authMiddleware.authenticateUserMiddleware, projetoController.deleteProjeto);

// Rota para buscar projetos por estado
router.get('/estado/:estado', authMiddleware.authenticateUserMiddleware, projetoController.getProjetosByEstado);

// Rota para buscar projetos por ID da posição
router.get('/posicao/:posicaoId', authMiddleware.authenticateUserMiddleware, projetoController.getProjetosByPosicaoId);

module.exports = router;
