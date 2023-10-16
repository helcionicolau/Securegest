const express = require('express');
const authController = require('../../controllers/auth/authController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

// Rota para login de usuário
router.post('/login', authController.loginUser);

// Rota para logout de usuário (usando o middleware de autenticação)
router.post('/logout', authMiddleware.authenticateUserMiddleware, authController.logoutUser);

// Adicione outras rotas de autenticação, como redefinição de senha, etc., se necessário

module.exports = router;


// Created by António Baptista #(24/08/2023)