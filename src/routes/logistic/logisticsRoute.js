const express = require('express');
const router = express.Router();
const logisticaController = require('../../controllers/logistic/logisticController');
const authMiddleware = require('../../middleware/authMiddleware');
const accessMiddleware = require('../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de logística
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    logisticaController.createLogistica
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    logisticaController.getAllLogisticas
);
router.get('/equipment-count', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    logisticaController.getEquipmentLogisticsCount
);
router.get('/armament-count', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    logisticaController.getArmamentLogisticsCount
);
router.get('/:logisticaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    logisticaController.getLogisticaById
);
router.get('/categoria/:categoriaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    logisticaController.getLogisticsByCategoriaId
);
router.put('/:logisticaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    logisticaController.updateLogistica
);
router.delete('/:logisticaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    logisticaController.deleteLogistica
);

module.exports = router;
