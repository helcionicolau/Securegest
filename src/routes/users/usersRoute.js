const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController');
const authMiddleware = require('../../middleware/authMiddleware');
const accessMiddleware = require('../../middleware/accessMiddleware'); // Importação do middleware de acesso

// Rotas para o CRUD de usuários
router.post('/register', 
     authMiddleware.authenticateUserMiddleware, 
     accessMiddleware('add'),
     userController.registerUser,
); // Rota para registrar um novo usuário (não requer autenticação)

router.get('/', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar usuários
    userController.getAllUsers
);

router.get('/:userId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('view'), // Permissão para visualizar usuário específico
    userController.getUserById
);

router.put('/:userId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('update'), // Permissão para atualizar usuário
    userController.updateUser
);

router.delete('/:userId', 
    authMiddleware.authenticateUserMiddleware, 
    accessMiddleware('delete'), // Permissão para deletar usuário
    userController.deleteUser
);

module.exports = router;

// Created by António Baptista #(24/08/2023)
