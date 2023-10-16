const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController');
const authMiddleware = require('../../middleware/authMiddleware');

// Rotas para o CRUD de usuários
router.post('/register', userController.registerUser);// Rota para registrar um novo usuário (não requer autenticação)
router.get('/', authMiddleware.authenticateUserMiddleware, userController.getAllUsers);
router.get('/:userId', authMiddleware.authenticateUserMiddleware, userController.getUserById);
router.put('/:userId', authMiddleware.authenticateUserMiddleware, userController.updateUser);
router.delete('/:userId', authMiddleware.authenticateUserMiddleware, userController.deleteUser);

module.exports = router;

// Created by António Baptista #(24/08/2023)