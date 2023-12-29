const express = require('express');
const router = express.Router();
const postoSegurancaController = require('../../../controllers/operation_control/security/attributionPostSecurityController');
const authMiddleware = require('../../../middleware/authMiddleware');

// Rotas para o CRUD de posto_segurancas
router.post('/register', authMiddleware.authenticateUserMiddleware, postoSegurancaController.registerPostoSeguranca);
router.get('/', authMiddleware.authenticateUserMiddleware, postoSegurancaController.getAllPostosSegurancas);
router.get('/seguranca-funcionarios', authMiddleware.authenticateUserMiddleware, postoSegurancaController.getAllSegurancaFuncionarios);
router.get('/:postoSegurancaId', authMiddleware.authenticateUserMiddleware, postoSegurancaController.getPostoSegurancaById);
router.put('/:postoSegurancaId', authMiddleware.authenticateUserMiddleware, postoSegurancaController.updatePostoSeguranca);
router.delete('/:postoSegurancaId', authMiddleware.authenticateUserMiddleware, postoSegurancaController.deletePostoSeguranca);

module.exports = router;