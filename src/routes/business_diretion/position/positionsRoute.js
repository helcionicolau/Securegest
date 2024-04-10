const express = require('express');
const router = express.Router();
const positionController = require('../../../controllers/business_diretion/position/positionController');
const authMiddleware = require('../../../middleware/authMiddleware');


router.post('/register', authMiddleware.authenticateUserMiddleware, positionController.registerPosicao);
router.get('/', authMiddleware.authenticateUserMiddleware, positionController.getAllPosicoes);
router.get('/:posicaoId', authMiddleware.authenticateUserMiddleware, positionController.getPosicaoById);
router.put('/:posicaoId', authMiddleware.authenticateUserMiddleware, positionController.updatePosicao);
router.delete('/:posicaoId', authMiddleware.authenticateUserMiddleware, positionController.deletePosicao);

module.exports = router;