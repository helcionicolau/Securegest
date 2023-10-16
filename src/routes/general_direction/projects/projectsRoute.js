const express = require('express');
const router = express.Router();
const projetoController = require('../../../controllers/general_direction/projects/projectController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de projetos
router.post('/register', authMiddleware.authenticateUserMiddleware, projetoController.registerProjeto);
router.get('/', authMiddleware.authenticateUserMiddleware, projetoController.getAllProjetos);
router.get('/total', authMiddleware.authenticateUserMiddleware, projetoController.getTotalProjetos);
router.get('/totalPorData', authMiddleware.authenticateUserMiddleware, projetoController.getTotalProjetosPorData);
router.get('/:projetoId', authMiddleware.authenticateUserMiddleware, projetoController.getProjetoById);
router.put('/:projetoId', authMiddleware.authenticateUserMiddleware, projetoController.updateProjeto);
router.delete('/:projetoId', authMiddleware.authenticateUserMiddleware, projetoController.deleteProjeto);

// Adicione a nova rota para obter projetos por departamento
router.get('/byDepartamento/:id_departamento', authMiddleware.authenticateUserMiddleware, projetoController.getProjetosByDepartamento);

module.exports = router;

// Created by António Baptista #(24/08/2023)