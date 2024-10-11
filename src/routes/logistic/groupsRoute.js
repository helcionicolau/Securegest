const express = require('express');
const router = express.Router();
const groupController = require('../../controllers/logistic/groupController');
const authMiddleware = require('../../middleware/authMiddleware'); 
const accessMiddleware = require('../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de grupos
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    groupController.createGroup
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    groupController.getAllGroups
);
router.get('/:grupoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    groupController.getGroupById
);
router.put('/:grupoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    groupController.updateGroup
);
router.delete('/:grupoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    groupController.deleteGroup
);

// Rotas adicionais para buscar por logistica
router.get('/logistica/:logisticId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    groupController.getGroupByLogisticId
);

module.exports = router;
