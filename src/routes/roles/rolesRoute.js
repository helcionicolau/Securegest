const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/roles/roleController');
const authMiddleware = require('../../middleware/authMiddleware');
const accessMiddleware = require('../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de roles
router.post('/register', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('add'), // Permissão para adicionar
    roleController.createRole
);

router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    roleController.getAllRoles
);

router.get('/:roleId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar
    roleController.getRoleById
);

router.put('/:roleId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar
    roleController.updateRole
);

router.delete('/:roleId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar
    roleController.deleteRole
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
