const express = require('express');
const router = express.Router();
const roleAccessController = require('../../controllers/role_access/roleAccessController');
const authMiddleware = require('../../middleware/authMiddleware');

// Rotas para o CRUD de role access
router.post('/', authMiddleware.authenticateUserMiddleware, roleAccessController.createRoleAccess);
router.get('/', authMiddleware.authenticateUserMiddleware, roleAccessController.getAllRoleAccess);
router.get('/:roleAccessId', authMiddleware.authenticateUserMiddleware, roleAccessController.getRoleAccessById);
router.put('/:roleAccessId', authMiddleware.authenticateUserMiddleware, roleAccessController.updateRoleAccess);
router.delete('/:roleAccessId', authMiddleware.authenticateUserMiddleware, roleAccessController.deleteRoleAccess);

module.exports = router;
