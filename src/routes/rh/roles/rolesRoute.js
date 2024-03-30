const express = require('express');
const router = express.Router();
const cargosController = require('../../../controllers/rh/roles/roleController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de cargos
router.post('/register', authMiddleware.authenticateUserMiddleware, cargosController.registerCargo);
router.get('/', authMiddleware.authenticateUserMiddleware, cargosController.getAllCargos);
router.get('/:cargoId', authMiddleware.authenticateUserMiddleware, cargosController.getCargoById);
router.put('/:cargoId', authMiddleware.authenticateUserMiddleware, cargosController.updateCargo);
router.delete('/:cargoId', authMiddleware.authenticateUserMiddleware, cargosController.deleteCargo);

module.exports = router;
