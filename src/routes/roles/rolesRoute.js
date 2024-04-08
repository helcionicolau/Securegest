const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/roles/roleController');
const authMiddleware = require('../../middleware/authMiddleware');

// Rotas para o CRUD de roles
router.post('/register', authMiddleware.authenticateUserMiddleware ,roleController.createRole);
router.get('/', authMiddleware.authenticateUserMiddleware, roleController.getAllRoles);
router.get('/:roleId', authMiddleware.authenticateUserMiddleware, roleController.getRoleById);
router.put('/:roleId', authMiddleware.authenticateUserMiddleware, roleController.updateRole);
router.delete('/:roleId', authMiddleware.authenticateUserMiddleware, roleController.deleteRole);

module.exports = router;