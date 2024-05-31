const express = require('express');
const router = express.Router();
const categoriaMaterialLogisticaController = require('../../../controllers/logistic/category/categoryController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Authentication middleware for all routes
router.use(authMiddleware);

// Rotas para o CRUD de categorias material logistica
router.post('/register', authMiddleware.authenticateUserMiddleware, categoriaMaterialLogisticaController.createCategoriaMaterialLogistica);
router.get('/', authMiddleware.authenticateUserMiddleware, categoriaMaterialLogisticaController.getAllCategoriasMateriaisLogisticas);
router.get('/:categoriaId', authMiddleware.authenticateUserMiddleware, categoriaMaterialLogisticaController.getCategoriaMaterialLogisticaById);
router.put('/:categoriaId', authMiddleware.authenticateUserMiddleware, categoriaMaterialLogisticaController.updateCategoriaMaterialLogistica);
router.delete('/:categoriaId', authMiddleware.authenticateUserMiddleware, categoriaMaterialLogisticaController.deleteCategoriaMaterialLogistica);

module.exports = router;