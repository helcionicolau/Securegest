const express = require('express');
const router = express.Router();
const attributeLogisticController = require('../../controllers/logistic/attributeLogisticController');
const authMiddleware = require('../../middleware/authMiddleware'); 

router.post('/register', authMiddleware.authenticateUserMiddleware, attributeLogisticController.createAttributeLogistic);
router.get('/', authMiddleware.authenticateUserMiddleware, attributeLogisticController.getAllAttributeLogistics);
router.get('/:atribuicaoId', authMiddleware.authenticateUserMiddleware, attributeLogisticController.getAttributeLogisticById);
router.put('/:atribuicaoId', authMiddleware.authenticateUserMiddleware, attributeLogisticController.updateAttributeLogistic);
router.delete('/:atribuicaoId', authMiddleware.authenticateUserMiddleware, attributeLogisticController.deleteAttributeLogistic);

// Rotas adicionais para buscar por posto, funcionario e logistica (assuming methods exist in the controller)
router.get('/posto/:postId', authMiddleware.authenticateUserMiddleware, attributeLogisticController.getAttributeLogisticsByPostId);
router.get('/funcionario/:employeeId', authMiddleware.authenticateUserMiddleware, attributeLogisticController.getAttributeLogisticsByEmployeeId);
router.get('/logistica/:logisticId', authMiddleware.authenticateUserMiddleware, attributeLogisticController.getAttributeLogisticsByLogisticId);
router.get('/conjunto/:groupId', authMiddleware.authenticateUserMiddleware, attributeLogisticController.getAttributeLogisticsByGroupId);

module.exports = router;
