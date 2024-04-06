const express = require('express');
const authController = require('../../controllers/auth/authController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/login', authController.loginUser);

router.post('/logout', authMiddleware.authenticateUserMiddleware, authController.logoutUser);

module.exports = router;

// Created by António Baptista #(24/08/2023)