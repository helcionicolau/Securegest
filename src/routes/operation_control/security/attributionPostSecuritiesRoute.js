const express = require('express');
const router = express.Router();
const postoSegurancasController = require('../../../controllers/operation_control/security/attributionPostSecurityController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de seguranças em postos
router.get('/segurancas-disponiveis', authMiddleware.authenticateUserMiddleware, postoSegurancasController.getSegurancasDisponiveis);
router.post('/register', authMiddleware.authenticateUserMiddleware, postoSegurancasController.registerPostoSeguranca);
router.get('/', authMiddleware.authenticateUserMiddleware, postoSegurancasController.getAllPostosSegurancas);
router.get('/:postoSegurancaId', authMiddleware.authenticateUserMiddleware, postoSegurancasController.getPostoSegurancaById);
router.put('/:postoSegurancaId', authMiddleware.authenticateUserMiddleware, postoSegurancasController.updatePostoSeguranca);
router.delete('/:postoSegurancaId', authMiddleware.authenticateUserMiddleware, postoSegurancasController.deletePostoSeguranca);

module.exports = router;
