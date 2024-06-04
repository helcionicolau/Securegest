const express = require('express');
const router = express.Router();
const logisticaController = require('../../controllers/logistic/logisticController');
const authMiddleware = require('../../middleware/authMiddleware');


// Rotas para o CRUD de logistica
router.post('/register', authMiddleware.authenticateUserMiddleware, logisticaController.createLogistica);
router.get('/', authMiddleware.authenticateUserMiddleware, logisticaController.getAllLogisticas);
router.get('/:logisticaId', authMiddleware.authenticateUserMiddleware, logisticaController.getLogisticaById);
router.put('/:logisticaId', authMiddleware.authenticateUserMiddleware, logisticaController.updateLogistica);
router.delete('/:logisticaId', authMiddleware.authenticateUserMiddleware, logisticaController.deleteLogistica);

router.get('/equipment-count', authMiddleware.authenticateUserMiddleware, logisticaController.getEquipmentLogisticsCount);
router.get('/armament-count', authMiddleware.authenticateUserMiddleware, logisticaController.getArmamentLogisticsCount);

module.exports = router;
