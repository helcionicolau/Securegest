const express = require('express');
const router = express.Router();
const attributeLogisticController = require('../../controllers/logistic/attributeLogisticController');
const authMiddleware = require('../../middleware/authMiddleware'); 
const accessMiddleware = require('../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de atributos logísticos
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    attributeLogisticController.createAttributeLogistic
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    attributeLogisticController.getAllAttributeLogistics
);
router.get('/:atribuicaoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    attributeLogisticController.getAttributeLogisticById
);
router.put('/:atribuicaoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    attributeLogisticController.updateAttributeLogistic
);
router.delete('/:atribuicaoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    attributeLogisticController.deleteAttributeLogistic
);

// Rotas adicionais para buscar por posto, funcionário e logística
router.get('/posto/:postId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    attributeLogisticController.getAttributeLogisticsByPostId
);
router.get('/funcionario/:employeeId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    attributeLogisticController.getAttributeLogisticsByEmployeeId
);
router.get('/logistica/:logisticId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    attributeLogisticController.getAttributeLogisticsByLogisticId
);
router.get('/conjunto/:groupId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    attributeLogisticController.getAttributeLogisticsByGroupId
);

module.exports = router;
