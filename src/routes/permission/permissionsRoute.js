const express = require('express');
const router = express.Router();
const permissoesController = require('../../controllers/permission/permissionController');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/register', permissoesController.registerPermissao);
router.get('/', authMiddleware.authenticateUserMiddleware, permissoesController.getAllPermissoes);
router.get('/:permissaoId', authMiddleware.authenticateUserMiddleware, permissoesController.getPermissaoById);
router.put('/:permissaoId', authMiddleware.authenticateUserMiddleware, permissoesController.updatePermissao);
router.delete('/:permissaoId', authMiddleware.authenticateUserMiddleware, permissoesController.deletePermissao);

module.exports = router;