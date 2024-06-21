const express = require('express');
const router = express.Router();
const logisticaController = require('../../controllers/logistic/logisticController');
const authMiddleware = require('../../middleware/authMiddleware');


// Rotas para o CRUD de logistica
router.post('/register', authMiddleware.authenticateUserMiddleware, logisticaController.createLogistica);
router.get('/', authMiddleware.authenticateUserMiddleware, logisticaController.getAllLogisticas);
router.get('/equipment-count', authMiddleware.authenticateUserMiddleware, logisticaController.getEquipmentLogisticsCount);
router.get('/armament-count', authMiddleware.authenticateUserMiddleware, logisticaController.getArmamentLogisticsCount);
router.get('/:logisticaId', authMiddleware.authenticateUserMiddleware, logisticaController.getLogisticaById);
router.get('/categoria/:categoriaId', authMiddleware.authenticateUserMiddleware, logisticaController.getLogisticsByCategoriaId);
router.put('/:logisticaId', authMiddleware.authenticateUserMiddleware, logisticaController.updateLogistica);
router.delete('/:logisticaId', authMiddleware.authenticateUserMiddleware, logisticaController.deleteLogistica);

module.exports = router;
