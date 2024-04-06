const express = require('express');
const router = express.Router();
const perfisPermissoesController = require('../../controllers/profile_permission/profilePermission');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/associate', perfisPermissoesController.associatePermissaoToPerfil);
router.get('/', authMiddleware.authenticateUserMiddleware, perfisPermissoesController.getAllAssociacoes);
router.get('/:associacaoId', authMiddleware.authenticateUserMiddleware, perfisPermissoesController.getAssociacaoById);
router.delete('/:associacaoId', authMiddleware.authenticateUserMiddleware, perfisPermissoesController.deleteAssociacao);

module.exports = router;
