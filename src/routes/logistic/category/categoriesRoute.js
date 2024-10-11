const express = require('express');
const router = express.Router();
const categoriaMaterialLogisticaController = require('../../../controllers/logistic/category/categoryController');
const authMiddleware = require('../../../middleware/authMiddleware'); 
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de categorias material logística
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    categoriaMaterialLogisticaController.createCategoriaMaterialLogistica
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    categoriaMaterialLogisticaController.getAllCategoriasMateriaisLogisticas
);
router.get('/:categoriaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    categoriaMaterialLogisticaController.getCategoriaMaterialLogisticaById
);
router.put('/:categoriaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    categoriaMaterialLogisticaController.updateCategoriaMaterialLogistica
);
router.delete('/:categoriaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    categoriaMaterialLogisticaController.deleteCategoriaMaterialLogistica
);

module.exports = router;
