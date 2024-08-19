const express = require('express');
const router = express.Router();
const levantamentoController = require('../../../controllers/business_diretion/dn_request/dnRequestController');
const authMiddleware = require('../../../middleware/authMiddleware');

router.post('/register', authMiddleware.authenticateUserMiddleware, levantamentoController.registerLevantamento);
router.get('/', authMiddleware.authenticateUserMiddleware, levantamentoController.getAllLevantamentos);
router.get('/:levantamentoId', authMiddleware.authenticateUserMiddleware, levantamentoController.getLevantamentoById);
router.put('/:levantamentoId', authMiddleware.authenticateUserMiddleware, levantamentoController.updateLevantamento);
router.delete('/:levantamentoId', authMiddleware.authenticateUserMiddleware, levantamentoController.deleteLevantamento);

router.get('/departamento/:departamentoId', authMiddleware.authenticateUserMiddleware, levantamentoController.getLevantamentosByDepartamentoId);
router.get('/cliente/:clienteId', authMiddleware.authenticateUserMiddleware, levantamentoController.getLevantamentosByClienteId);

module.exports = router;
