const express = require('express');
const router = express.Router();
const provedoraController = require('../../../controllers/business_diretion/provider/providerController');
const authMiddleware = require('../../../middleware/authMiddleware');
const accessMiddleware = require('../../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de provedoras
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    provedoraController.registerProvedora
);
router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    provedoraController.getAllProvedoras
);
router.get('/:provedoraId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    provedoraController.getProvedoraById
);
router.put('/:provedoraId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    provedoraController.updateProvedora
);
router.delete('/:provedoraId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    provedoraController.deleteProvedora
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
