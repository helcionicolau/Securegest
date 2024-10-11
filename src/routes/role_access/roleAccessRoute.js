const express = require('express');
const router = express.Router();
const roleAccessController = require('../../controllers/role_access/roleAccessController');
const authMiddleware = require('../../middleware/authMiddleware');
const accessMiddleware = require('../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de role access
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    roleAccessController.createRoleAccess
);

router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    roleAccessController.getAllRoleAccess
);

router.get('/:roleAccessId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    roleAccessController.getRoleAccessById
);

router.put('/:roleAccessId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    roleAccessController.updateRoleAccess
);

router.delete('/:roleAccessId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    roleAccessController.deleteRoleAccess
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
