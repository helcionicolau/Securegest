const express = require('express');
const router = express.Router();
const postoSegurancaController = require('../../../controllers/business_diretion/post_security/postSecurityController');
const authMiddleware = require('../../../middleware/authMiddleware');


// Routes for CRUD operations
router.post('/register', authMiddleware.authenticateUserMiddleware, postoSegurancaController.createPostoSeguranca);
router.get('/', authMiddleware.authenticateUserMiddleware, postoSegurancaController.getAllPostoSegurancas);
router.get('/:postoSegurancaId', authMiddleware.authenticateUserMiddleware, postoSegurancaController.getPostoSegurancaById);
router.put('/:postoSegurancaId', authMiddleware.authenticateUserMiddleware, postoSegurancaController.updatePostoSeguranca);
router.delete('/:postoSegurancaId', authMiddleware.authenticateUserMiddleware, postoSegurancaController.deletePostoSeguranca);

// Routes for searching by Post ID and Funcionario ID
router.get('/posto/:postoId', authMiddleware.authenticateUserMiddleware, postoSegurancaController.getPostoSegurancaByPostoId);
router.get('/funcionario/:funcionarioId', authMiddleware.authenticateUserMiddleware, postoSegurancaController.getPostoSegurancaByFuncionarioId);

module.exports = router;
