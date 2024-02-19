const express = require('express');
const router = express.Router();
const operadorController = require('../../../controllers/operation_control/operators/operatorController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de operador
router.post('/', authMiddleware.authenticateUserMiddleware, operadorController.registerOperador);
router.get('/', authMiddleware.authenticateUserMiddleware, operadorController.getAllOperadores);
router.get('/:operadorId', authMiddleware.authenticateUserMiddleware, operadorController.getOperadorById);
router.get('/funcionario/:funcionarioId', authMiddleware.authenticateUserMiddleware, operadorController.getOperadoresByFuncionarioId);
router.put('/:operadorId', authMiddleware.authenticateUserMiddleware, operadorController.updateOperador);
router.delete('/:operadorId', authMiddleware.authenticateUserMiddleware, operadorController.deleteOperador);

module.exports = router;
