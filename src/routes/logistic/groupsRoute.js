const express = require('express');
const router = express.Router();
const groupController = require('../../controllers/logistic/groupController');
const authMiddleware = require('../../middleware/authMiddleware'); 

router.post('/register', authMiddleware.authenticateUserMiddleware, groupController.createGroup);
router.get('/', authMiddleware.authenticateUserMiddleware, groupController.getAllGroups);
router.get('/:grupoId', authMiddleware.authenticateUserMiddleware, groupController.getGroupById);
router.put('/:grupoId', authMiddleware.authenticateUserMiddleware, groupController.updateGroup);
router.delete('/:grupoId', authMiddleware.authenticateUserMiddleware, groupController.deleteGroup);

// Rotas adicionais para buscar por posto, funcionario e logistica (assuming methods exist in the controller)
router.get('/logistica/:logisticId', authMiddleware.authenticateUserMiddleware, groupController.getGroupByLogisticId);

module.exports = router;
