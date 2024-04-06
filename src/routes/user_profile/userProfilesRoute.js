const express = require('express');
const router = express.Router();
const usuarioPerfisController = require('../../controllers/user_profile/userProfileController');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/associate', usuarioPerfisController.associatePerfilToUser);
router.get('/', authMiddleware.authenticateUserMiddleware, usuarioPerfisController.getAllAssociacoes);
router.get('/:associacaoId', authMiddleware.authenticateUserMiddleware, usuarioPerfisController.getAssociacaoById);
router.delete('/:associacaoId', authMiddleware.authenticateUserMiddleware, usuarioPerfisController.deleteAssociacao);

module.exports = router;
    