const express = require('express');
const router = express.Router();
const postoSegurancaController = require('../../../controllers/business_diretion/post_security/postSecurityController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para operações CRUD
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    postoSegurancaController.createPostoSeguranca
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    postoSegurancaController.getAllPostoSegurancas
);
router.get('/:postoSegurancaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    postoSegurancaController.getPostoSegurancaById
);
router.put('/:postoSegurancaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    postoSegurancaController.updatePostoSeguranca
);
router.delete('/:postoSegurancaId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    postoSegurancaController.deletePostoSeguranca
);

// Rotas para buscar por ID de Posto e ID de Funcionário
router.get('/posto/:postoId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    postoSegurancaController.getPostoSegurancaByPostoId
);
router.get('/seguranca/:funcionarioId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    postoSegurancaController.getPostoSegurancaByFuncionarioId
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
